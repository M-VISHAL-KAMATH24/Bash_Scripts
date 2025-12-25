package com.chatapp.quikchat.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "messages")
public class Message {
    @Id
    private String id;
    
    private String chatId;
    private String senderId;
    private String senderTag;
    private String content;
    private LocalDateTime timestamp;
    
    public Message() {}
    
    public Message(String chatId, String senderId, String senderTag, String content) {
        this.chatId = chatId;
        this.senderId = senderId;
        this.senderTag = senderTag;
        this.content = content;
        this.timestamp = LocalDateTime.now();
    }

    // Getters & Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getChatId() { return chatId; }
    public void setChatId(String chatId) { this.chatId = chatId; }
    
    public String getSenderId() { return senderId; }
    public void setSenderId(String senderId) { this.senderId = senderId; }
    
    public String getSenderTag() { return senderTag; }
    public void setSenderTag(String senderTag) { this.senderTag = senderTag; }
    
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
