package com.crs.backend.model;


import javax.persistence.*;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Entity
@Getter
@Setter
@Table(name = "customers")
public class Customer {

    @Id
    @GeneratedValue
    private int id;
    private String customerId;
    private String customerType;

}