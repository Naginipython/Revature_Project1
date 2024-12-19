package com.revature.models.DTOs;

// Intellij suggested this, since this class exists only to be created and get data, to be placed somewhere else
// Automatic constructor (all Args), getters, and toString methods!
public record IncomingReimbursementDTO(float amount, String description, int userId) {}
