package com.example.auction_web.repository;

import com.example.auction_web.entity.Requirement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RequirementRepository extends JpaRepository<Requirement, String> {
    List<Requirement> findRequirementsByUser_UserId(String userId);
    List<Requirement> findRequirementsByInsprector_InsprectorId(String insprectorId);
}
