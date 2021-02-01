package com.crs.backend.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Entity
@Getter
@Setter
@Table(name = "vehicles")
public class Vehicle {

    @Id
    @GeneratedValue
    private int id;
    private String vehicleType;
    private String vehicleLocation;
    private boolean isAvaliable;
    
}
