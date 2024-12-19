package com.revature.models;

import jakarta.persistence.*;
import org.springframework.stereotype.Component;

@Component
@Entity
@Table(name = "reimbursement")
public class Reimbursement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reimbId;

    private String description;

    @Column(nullable = false)
    private float amount;

    @Column(nullable = false)
    private String status = "PENDING";

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "userId")
    private User user;

    // boilerplate
    public Reimbursement() {}
    public Reimbursement(int reimbId, String description, float amount, String status, User user) {
        this.reimbId = reimbId;
        this.description = description;
        this.amount = amount;
        this.status = status;
        this.user = user;
    }

    public int getReimbId() { return reimbId; }
    public String getDescription() { return description; }
    public float getAmount() { return amount; }
    public String getStatus() { return status; }
    public User getUser() { return user; }

    public void setReimbId(int reimbId) { this.reimbId = reimbId; }
    public void setDescription(String description) { this.description = description; }
    public void setAmount(float amount) { this.amount = amount; }
    public void setStatus(String status) { this.status = status; }
    public void setUser(User user) { this.user = user; }

    @Override
    public String toString() {
        return "Reimbursement{" +
                "reimbId=" + reimbId +
                ", description='" + description + '\'' +
                ", amount=" + amount +
                ", status='" + status + '\'' +
                ", user=" + user +
                '}';
    }
}
