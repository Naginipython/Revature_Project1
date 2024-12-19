package com.revature.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.revature.aspects.ManagerOnly;
import com.revature.models.User;
import com.revature.services.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin(allowCredentials = "true", value = "http://localhost:5173")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    @ManagerOnly
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> result = userService.getAllUsers();
        return ResponseEntity.ok(result);
    }
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User result = userService.createUser(user);
        return ResponseEntity.ok(result);
    }
    @PatchMapping("/{userId}")
    @ManagerOnly
    public ResponseEntity<User> promoteUser(@RequestParam int userId) {
        User result = userService.promoteUser(userId);
        return ResponseEntity.ok(result);
    }
    @DeleteMapping("{userId}")
    @ManagerOnly
    public ResponseEntity<String> deleteUser(@RequestParam int userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok("User deleted");
    }
}
