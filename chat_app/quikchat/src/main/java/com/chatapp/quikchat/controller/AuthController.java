package com.chatapp.quikchat.controller;

import com.chatapp.quikchat.dto.SignupRequest;
import com.chatapp.quikchat.dto.LoginRequest;  // ← ADD THIS
import com.chatapp.quikchat.entity.User;
import com.chatapp.quikchat.repository.UserRepository;  // ← ADD THIS
import com.chatapp.quikchat.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;  // ← ADD THIS
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private UserRepository userRepository;  // ← ADD THIS
    
    @Autowired
    private PasswordEncoder passwordEncoder;  // ← ADD THIS
    
    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> signup(@Valid @RequestBody SignupRequest request) {
        try {
            User user = userService.signup(request);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "User created successfully",
                "userId", user.getId()
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", e.getMessage()
            ));
        }
    }
    
    // ← ADD LOGIN ENDPOINT
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest request) {
        try {
            Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
            if (userOpt.isPresent() && 
                passwordEncoder.matches(request.getPassword(), userOpt.get().getPassword())) {
                return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Login successful",
                    "userId", userOpt.get().getId(),
                    "email", userOpt.get().getEmail()
                ));
            } else {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Invalid credentials"
                ));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Login failed"
            ));
        }
    }
}
