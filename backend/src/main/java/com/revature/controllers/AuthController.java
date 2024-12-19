package com.revature.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature.models.User;
import com.revature.models.DTOs.IncomingLoginDTO;
import com.revature.services.AuthService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/auth")
@CrossOrigin(allowCredentials = "true", value = "http://localhost:5173")
public class AuthController {
    private final AuthService authService;
    
    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping
    public ResponseEntity<User> login(@RequestBody IncomingLoginDTO login, HttpSession session) {
        User result = authService.login(login);
        
        session.setAttribute("userId", result.getUserId());
        session.setAttribute("username", result.getUsername());
        session.setAttribute("role", result.getRole());
        System.out.println("User " + result.getUsername() + " has logged in");

        return ResponseEntity.ok(result);
    }
    @GetMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate();
        System.out.println("User has logged out");
        return ResponseEntity.ok("User has logged out");
    }

    // Possible check_login for frontend
    
}
