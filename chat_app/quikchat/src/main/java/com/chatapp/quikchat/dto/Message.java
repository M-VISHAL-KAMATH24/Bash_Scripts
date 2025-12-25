package com.chatapp.quikchat.dto;

import java.time.LocalDateTime;

public class Message {
    private String chatId;
    private String senderId;
    private String senderTag;
    private String content;
    private LocalDateTime timestamp = LocalDateTime.now();

    // Default constructor
    public Message() {}

    // Constructor
    public Message(String chatId, String senderId, String senderTag, String content) {
        this.chatId = chatId;
        this.senderId = senderId;
        this.senderTag = senderTag;
        this.content = content;
    }

    // Getters & Setters
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
