package com.chatapp.quikchat.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "profiles")
public class Profile {
    @Id
    private String id;
    
    private String userId;
    private String username;
    private String tag;
    
    public Profile() {}
    
    public Profile(String userId, String username, String tag) {
        this.userId = userId;
        this.username = username;
        this.tag = tag;
    }

    // Getters & Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    
    public String getTag() { return tag; }
    public void setTag(String tag) { this.tag = tag; }
}
