package com.chatapp.quikchat.controller;

import com.chatapp.quikchat.dto.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class MessageController {
    @MessageMapping("/chat.send")
    @SendTo("/topic/public")
    public Message sendMessage(Message message) {
        System.out.println("📨 RECEIVED: " + message.getContent());
        return message;
    }
}
