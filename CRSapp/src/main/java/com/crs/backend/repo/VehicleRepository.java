package com.crs.backend.repo;

import java.util.List;

import com.crs.backend.model.Vehicle;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Integer>{

    List<Vehicle> findByIsAvaliable(boolean isAvaliable);
    
}
