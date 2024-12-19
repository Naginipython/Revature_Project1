package com.revature.services;

import com.revature.models.DTOs.*;
import com.revature.models.Reimbursement;
import com.revature.models.User;
import com.revature.repositories.ReimbursementRepository;
import com.revature.repositories.UserRepository;

import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.List;
import java.util.Optional;

@Service
public class ReimbursementService {
    private final ReimbursementRepository reimbRepo;
    private final UserRepository userRepo;
    @Autowired
    public ReimbursementService(ReimbursementRepository reimbRepo, UserRepository userRepo) {
        this.reimbRepo = reimbRepo;
        this.userRepo = userRepo;
    }

    private User getSessionUser() {
        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        HttpSession session = attr.getRequest().getSession(false);
        Optional<User> user = userRepo.findById((int) session.getAttribute("userId"));
        if (user.isEmpty()) {
            throw new IllegalArgumentException("Error: User not found in session");
        }
        return user.get();
    }

    public Reimbursement createReimbursement(IncomingReimbursementDTO incomingReimbursement) {
        if (incomingReimbursement.amount() <= 0) {
            throw new IllegalArgumentException("Amount must be greater than 0!");
        }
        // ID is confirmed in aspect
        User user = userRepo.findById(incomingReimbursement.userId()).get();
        Reimbursement result = new Reimbursement();
        result.setDescription(incomingReimbursement.description());
        result.setAmount(incomingReimbursement.amount());
        result.setUser(user);

        return reimbRepo.save(result);
    }

    // Possibly broken
    public List<Reimbursement> getTickets() {
        User user = getSessionUser();
        List<Reimbursement> result;
        if (user.getRole().equals("manager")) {
            result = reimbRepo.findAll();
        } else {
            result = reimbRepo.findByUser_UserId(user.getUserId());
        }
        return result;
    }

    // Possibly broken
    public List<Reimbursement> getTicketsByStatus(String status) {
        User user = getSessionUser();
        List<Reimbursement> result;
        if (user.getRole().equals("manager")) {
            result = reimbRepo.findByStatus(status);
        } else {
            result = reimbRepo.findByUser_UserIdAndStatus(user.getUserId(), status);
        }
        return result;
    }

    public Reimbursement updateReimbursement(IncomingReimbUpdateDTO reimbUpdate) {
        Optional<Reimbursement> reimb = reimbRepo.findById(reimbUpdate.reimbId());
        if (reimb.isEmpty()) {
            throw new IllegalArgumentException("Error: Reimbursement id used was not in database");
        }
        Reimbursement result = reimb.get();
        
        result.setDescription(reimbUpdate.description());
        return reimbRepo.save(result);
    }

    public Reimbursement updateReimbursementStatus(IncomingStatusUpdateDTO statUpdate) {
        Optional<Reimbursement> reimb = reimbRepo.findById(statUpdate.reimbId());
        if (reimb.isEmpty()) {
            throw new IllegalArgumentException("Error: Reimbursement id used was not in database");
        }
        Reimbursement result = reimb.get();
        result.setStatus(statUpdate.status());
        return reimbRepo.save(result);
    }
}
