package com.crs.backend.api;

import java.util.*;

import com.crs.backend.model.Vehicle;
import com.crs.backend.repo.VehicleRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("api/vehicles")
@RestController
@CrossOrigin
public class VehicleController {

    @Autowired
    private VehicleRepository vehicleRepository;
   
    @GetMapping("/")
    public List<Vehicle> getAvailableVehicles(){
        List<Vehicle> availabVehicles = vehicleRepository.findByIsAvaliable(true);
        Set<String> availabVehicleTypes = new HashSet<>();
        List<Vehicle> availabVehiclesWithoutRepetitions = new ArrayList<>();
        for (Vehicle vehicle : availabVehicles) {
            if (availabVehicleTypes.contains(vehicle.getVehicleType())) continue;
            availabVehicleTypes.add(vehicle.getVehicleType());
            availabVehiclesWithoutRepetitions.add(vehicle);
        } 
        return availabVehiclesWithoutRepetitions;
    }


    
}