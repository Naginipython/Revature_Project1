package com.revature.controllers;

import com.revature.models.DTOs.*;
import com.revature.aspects.ManagerOnly;
import com.revature.models.Reimbursement;
import com.revature.services.ReimbursementService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reimbursement")
@CrossOrigin(allowCredentials = "true", value = "http://localhost:5173")
public class ReimbursementController {
    private final ReimbursementService reimbService;

    @Autowired
    public ReimbursementController(ReimbursementService reimbService) {
        this.reimbService = reimbService;
    }

    @GetMapping
    public ResponseEntity<List<Reimbursement>> getTickets() {
        List<Reimbursement> result = reimbService.getTickets();
        return ResponseEntity.ok(result);
    }
    @GetMapping("/{status}")
    public ResponseEntity<List<Reimbursement>> getTicketByStatus(@PathVariable String status) {
        List<Reimbursement> result = reimbService.getTicketsByStatus(status.toUpperCase());
        return ResponseEntity.ok(result);
    }
    @PostMapping
    public ResponseEntity<Reimbursement> createReimbursement(
            @RequestBody IncomingReimbursementDTO incomingReimbursement) {
        Reimbursement result = reimbService.createReimbursement(incomingReimbursement);
        return ResponseEntity.ok(result);
    }
    @PatchMapping("/update_desc")
    public ResponseEntity<Reimbursement> updateReimbursement(@RequestBody IncomingReimbUpdateDTO reimbUpdate) {
        Reimbursement result = reimbService.updateReimbursement(reimbUpdate);
        return ResponseEntity.ok(result);
    }
    // Manager only methods
    @PatchMapping("/update_status")
    @ManagerOnly
    public ResponseEntity<Reimbursement> updateReimbursementStatus(@RequestBody IncomingStatusUpdateDTO statUpdate) {
        Reimbursement result = reimbService.updateReimbursementStatus(statUpdate);
        return ResponseEntity.ok(result);
    }
}
