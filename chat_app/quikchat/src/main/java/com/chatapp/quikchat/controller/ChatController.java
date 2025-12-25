package com.chatapp.quikchat.controller;

import com.chatapp.quikchat.dto.Message;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")  // ← VITE PORT!

// @CrossOrigin(origins = "*", allowedHeaders = "*")
public class ChatController {

    // In-memory chat storage (userId1-userId2 -> List<Message>)
    private final Map<String, List<Message>> chats = new ConcurrentHashMap<>();
    
    // Track last message count for each chat (for polling)
    private final Map<String, Integer> lastMessageCounts = new ConcurrentHashMap<>();

    /**
     * Send message to specific chat
     */
    @PostMapping("/chat")
    public ResponseEntity<String> sendMessage(@RequestBody Message message) {
        System.out.println("📨 SENT: " + message.getSenderTag() + " -> " + message.getContent());
        
        // Ensure chat exists
        chats.computeIfAbsent(message.getChatId(), k -> new ArrayList<>()).add(message);
        
        // Update last message count
        lastMessageCounts.put(message.getChatId(), 
            lastMessageCounts.getOrDefault(message.getChatId(), 0) + 1);
            
        return ResponseEntity.ok("Message sent!");
    }

    /**
     * Get messages for specific chat (with optional since parameter)
     */
    @GetMapping("/messages")
    public List<Message> getMessages(
            @RequestParam String chatId,
            @RequestParam(required = false) Optional<Integer> since) {
        
        List<Message> chatMessages = chats.getOrDefault(chatId, new ArrayList<>());
        
        // Return messages since last count (for efficient polling)
        if (since.isPresent()) {
            int sinceCount = since.get();
            int currentCount = chatMessages.size();
            if (sinceCount < currentCount) {
                return chatMessages.subList(sinceCount, currentCount);
            }
        }
        
        return chatMessages;
    }

    /**
     * Get recent messages summary (for dashboard)
     */
    @GetMapping("/recent-messages")
    public List<Message> getRecentMessages() {
        List<Message> recent = new ArrayList<>();
        chats.values().stream()
            .flatMap(List::stream)
            .sorted((a, b) -> b.getTimestamp().compareTo(a.getTimestamp())) // Latest first
            .limit(10)
            .forEach(recent::add);
        return recent;
    }

    /**
     * Clear chat history (for testing)
     */
    @DeleteMapping("/chat/{chatId}")
    public ResponseEntity<String> clearChat(@PathVariable String chatId) {
        chats.remove(chatId);
        lastMessageCounts.remove(chatId);
        return ResponseEntity.ok("Chat cleared");
    }
}
