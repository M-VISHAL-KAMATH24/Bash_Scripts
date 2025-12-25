package com.chatapp.quikchat.service;

import com.chatapp.quikchat.dto.SignupRequest;
import com.chatapp.quikchat.entity.User;
import com.chatapp.quikchat.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public User signup(SignupRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        
        User user = new User(request.getEmail(), passwordEncoder.encode(request.getPassword()));
        return userRepository.save(user);
    }
}
