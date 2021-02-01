package com.crs.backend.repo;

import java.util.List;

import com.crs.backend.model.Rent;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RentRepository extends JpaRepository<Rent, Integer> {
    
    List<Rent> findBycustomerAutoIdAndIsReturned(int customerAutoId, boolean isReturned);
}
