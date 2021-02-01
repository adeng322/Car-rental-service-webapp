package com.crs.backend.api;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.sql.Timestamp;

import com.crs.backend.model.Customer;
import com.crs.backend.model.Rent;
import com.crs.backend.model.Vehicle;
import com.crs.backend.repo.CustomerRepository;
import com.crs.backend.repo.RentRepository;
import com.crs.backend.repo.VehicleRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("api/rents")
@RestController
@CrossOrigin
public class RentController {

    @Autowired
    private RentRepository rentRepository;

    @Autowired
    private VehicleRepository vehicleRepository; 

    @Autowired
    private CustomerRepository customerRepository;

    public void updateVehicle(boolean notAvaliable, int vehicleId) {
        Vehicle vehicle =  vehicleRepository.findById(vehicleId).orElse(null);
        if (vehicle != null) {
            vehicle.setAvaliable(false);
            vehicleRepository.save(vehicle);
        }
        return;
    }

    @GetMapping("/{customerAutoId}")
    public List<Rent> getRent(@PathVariable int customerAutoId, boolean isReturned) {
        return rentRepository.findBycustomerAutoIdAndIsReturned(customerAutoId, isReturned);
    }

    @GetMapping("/return")
    public Rent returnVehicle(int customerAutoId){
        Date date = new Date();
        List<Rent> rents = rentRepository.findBycustomerAutoIdAndIsReturned(customerAutoId, false);

        if (rents.isEmpty()) return null;
        Rent rent = rents.get(0);

        long now = date.getTime() + (100 * 3600000); //set return times 100 hours from now

        if (now > rent.getReturnTimestamp().getTime()) {
            long overtime = (now - rent.getReturnTimestamp().getTime()) / 60000; //time exceed in minutes
            rent.setOvertime(overtime);
        } else {
            rent.setOvertime(0);
        }

        System.out.println(rent.getOvertime());
        rent.setReturned(true);
        rentRepository.save(rent);
        Vehicle vehicle = vehicleRepository.findById(rent.getVehicleId()).orElse(null);
        vehicle.setAvaliable(true);
        vehicleRepository.save(vehicle);
        
        return rent;
    }

    @PostMapping("/")
    public Rent postRent(@RequestBody Rent rent) {

        HashMap<String, Double> hourFeesForGold = new HashMap<>();
        hourFeesForGold.put("L1", 3.75);
        hourFeesForGold.put("L2", 3.85);
        hourFeesForGold.put("L3", 3.95);
        hourFeesForGold.put("L4", 3.95);
        hourFeesForGold.put("L5", 3.95);
        hourFeesForGold.put("L6", 3.95);
        hourFeesForGold.put("L7", 3.95);
        hourFeesForGold.put("M1", 8.75);
        hourFeesForGold.put("M2", 8.85);
        hourFeesForGold.put("M3", 8.95);
        hourFeesForGold.put("N1", 2.95);
        hourFeesForGold.put("N2", 2.95);
        hourFeesForGold.put("N3", 2.95);
        hourFeesForGold.put("O1", 17.5);
        hourFeesForGold.put("O2", 17.5);
        hourFeesForGold.put("O3", 17.5);
        hourFeesForGold.put("O4", 17.5);
        hourFeesForGold.put("T", 25.0);
        hourFeesForGold.put("G", 25.0);
        hourFeesForGold.put("SA", 25.0);
        hourFeesForGold.put("SB", 55.0);
        hourFeesForGold.put("SC", 19.5);
        hourFeesForGold.put("SD", 35.0);

        HashMap<String, Double> hourFeesForRegular = new HashMap<>();
        hourFeesForRegular.put("L1", 5.75);
        hourFeesForRegular.put("L2", 5.85);
        hourFeesForRegular.put("L3", 5.95);
        hourFeesForRegular.put("L4", 5.95);
        hourFeesForRegular.put("L5", 5.95);
        hourFeesForRegular.put("L6", 5.95);
        hourFeesForRegular.put("L7", 5.95);
        hourFeesForRegular.put("M1", 9.75);
        hourFeesForRegular.put("M2", 9.85);
        hourFeesForRegular.put("M3", 9.95);
        hourFeesForRegular.put("N1", 3.95);
        hourFeesForRegular.put("N2", 3.95);
        hourFeesForRegular.put("N3", 3.95);
        hourFeesForRegular.put("O1", 19.5);
        hourFeesForRegular.put("O2", 19.5);
        hourFeesForRegular.put("O3", 19.5);
        hourFeesForRegular.put("O4", 19.5);
        hourFeesForRegular.put("T", 30.0);
        hourFeesForRegular.put("G", 30.0);
        hourFeesForRegular.put("SA", 30.0);
        hourFeesForRegular.put("SB", 64.0);
        hourFeesForRegular.put("SC", 25.5);
        hourFeesForRegular.put("SD", 50.0);
        
        Date date = new Date();

        Customer customer = customerRepository.findById(rent.getCustomerAutoId()).orElse(null);
        Vehicle vehicle =  vehicleRepository.findById(rent.getVehicleId()).orElse(null);
        updateVehicle(false, vehicle.getId());
        
        rent.setStartTimestamp(new Timestamp(date.getTime()));

        double hours = (rent.getReturnTimestamp().getTime() - rent.getStartTimestamp().getTime())/3600000;
        
        double hoursFee = 0;

        if(customer.getCustomerType().equals("gold")) {
            hoursFee = hourFeesForGold.get(vehicle.getVehicleType()) * hours;
        } else {
            hoursFee = hourFeesForRegular.get(vehicle.getVehicleType()) * hours;
        }

        hoursFee = Math.floor(hoursFee * 100) / 100;
        rent.setFee(hoursFee);

        System.out.println(rent.getFee());
        
        return rentRepository.save(rent);
    }
}
