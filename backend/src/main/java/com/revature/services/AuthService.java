package com.revature.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.models.User;
import com.revature.models.DTOs.IncomingLoginDTO;
import com.revature.repositories.UserRepository;

@Service
public class AuthService {
    private final UserRepository userRepo;

    @Autowired
    public AuthService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    public User login (IncomingLoginDTO login) {
        Optional<User> user = userRepo.findByUsernameAndPassword(login.username(), login.password());
        if (user.isEmpty()) {
            throw new IllegalArgumentException("Error: Username or Password incorrect");
        }
        return user.get();
    }
}
