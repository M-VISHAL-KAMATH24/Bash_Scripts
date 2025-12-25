package com.chatapp.quikchat.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "chats")
public class Chat {
    @Id
    private String id;
    
    private String chatName;
    private List<String> participants;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    public Chat() {}
    
    public Chat(String chatName, List<String> participants) {
        this.chatName = chatName;
        this.participants = participants;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    // Getters & Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getChatName() { return chatName; }
    public void setChatName(String chatName) { this.chatName = chatName; }
    
    public List<String> getParticipants() { return participants; }
    public void setParticipants(List<String> participants) { this.participants = participants; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
