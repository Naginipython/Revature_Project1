package com.revature.repositories;

import com.revature.models.Reimbursement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReimbursementRepository extends JpaRepository<Reimbursement, Integer> {
    // Here, UserId corresponds to the userId field in the User entity. The double underscore (_) allows navigation from Reimbursement to the User entity.
    List<Reimbursement> findByUser_UserId(int userId);
    List<Reimbursement> findByStatus(String status);
    List<Reimbursement> findByUser_UserIdAndStatus(int userId, String status);
}
