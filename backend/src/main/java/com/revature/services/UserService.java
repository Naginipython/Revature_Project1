package com.revature.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.models.User;
import com.revature.repositories.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepo;
    @Autowired
    public UserService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    public User createUser(User user) {
        if (user.getFirstName() == null || user.getFirstName().isBlank()) {
            throw new IllegalArgumentException("First name must not be blank!");
        }
        if (user.getLastName() == null || user.getLastName().isBlank()) {
            throw new IllegalArgumentException("Last name must not be blank!");
        }
        List<User> usernames = userRepo.findByUsername(user.getUsername());
        if (user.getUsername() == null || user.getUsername().isBlank() || !usernames.isEmpty()) {
            throw new IllegalArgumentException("Username must not be blank or taken!");
        }
        if (user.getPassword() == null || user.getPassword().length() < 8) {
            throw new IllegalArgumentException("Password must be more than 8 characters long!");
        }
        if (user.getRole() == null || user.getRole().isBlank()) {
            throw new IllegalArgumentException("Role must not be blank!");
        }
        return userRepo.save(user);
    }

    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    public void deleteUser(int userId) {
        userRepo.deleteById(userId);
    }

    public User promoteUser(int userId) {
        Optional<User> userToPromote = userRepo.findById(userId);
        if (userToPromote.isEmpty()) {
            throw new IllegalArgumentException("Error: User id used was not in database");
        }
        if (userToPromote.get().getRole().equals("manager")) {
            throw new IllegalArgumentException("Error: User is already a manager");
        }
        User result = userToPromote.get();
        result.setRole("manager");
        return userRepo.save(result);
    }
}
