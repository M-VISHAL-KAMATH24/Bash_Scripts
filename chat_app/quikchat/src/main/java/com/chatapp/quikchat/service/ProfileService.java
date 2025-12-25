package com.chatapp.quikchat.service;

import com.chatapp.quikchat.entity.Profile;
import com.chatapp.quikchat.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {
    
    @Autowired
    private ProfileRepository profileRepository;
    
    public Profile createProfile(String userId, String username, String tag) {
        if (profileRepository.existsByTagIgnoreCase(tag)) {
            throw new RuntimeException("Tag already exists");
        }
        
        Profile profile = new Profile(userId, username, tag);
        return profileRepository.save(profile);
    }
    
    public Profile getProfileByUserId(String userId) {
        return profileRepository.findByUserId(userId)
            .orElseThrow(() -> new RuntimeException("Profile not found"));
    }
}
