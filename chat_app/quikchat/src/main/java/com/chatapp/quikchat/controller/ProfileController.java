package com.chatapp.quikchat.controller;

import com.chatapp.quikchat.entity.Profile;
import com.chatapp.quikchat.repository.ProfileRepository;  // ← ADD THIS
import com.chatapp.quikchat.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;  // ← ADD THIS
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "*")
public class ProfileController {
    
    @Autowired
    private ProfileService profileService;
    
    @Autowired
    private ProfileRepository profileRepository;  // ← ADD THIS
    
    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> createProfile(
            @RequestBody Map<String, String> request) {
        try {
            String userId = request.get("userId");
            String username = request.get("username");
            String tag = request.get("tag");
            
            Profile profile = profileService.createProfile(userId, username, tag);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Profile created",
                "profile", profile
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", e.getMessage()
            ));
        }
    }
    
    @GetMapping("/{userId}")
    public ResponseEntity<Map<String, Object>> getProfile(@PathVariable String userId) {
        try {
            Profile profile = profileService.getProfileByUserId(userId);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "profile", profile
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", e.getMessage()
            ));
        }
    }
    
    // ← FIXED SEARC ENDPOINT
   @GetMapping("/search")
public ResponseEntity<Map<String, Object>> searchProfiles(
        @RequestParam String tag, 
        @RequestParam(defaultValue = "") String exclude) {
    try {
        List<Profile> profiles = profileRepository.findByTagContainingIgnoreCase(tag)
            .stream()
            .filter(p -> !p.getId().equals(exclude))  // Exclude current user
            .collect(Collectors.toList());
        return ResponseEntity.ok(Map.of("success", true, "profiles", profiles));
    } catch (Exception e) {
        return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Search failed"));
    }
}

}
