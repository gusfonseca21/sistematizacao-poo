package com.example.sitematizacaopoo.complaint;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ComplaintRepository extends JpaRepository<Complaint, Integer> {
    @Query("SELECT c FROM complaint c WHERE c.code = :code")
    Optional<Complaint> findByCode(@Param("code") String code);
}
