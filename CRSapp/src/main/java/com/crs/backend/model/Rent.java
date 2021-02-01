package com.crs.backend.model;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Entity
@Getter
@Setter
@Table(name = "rents")
public class Rent {

    @Id
    @GeneratedValue
    private int id;
    private int customerAutoId;
    private int vehicleId;
    private Timestamp startTimestamp;
    private Timestamp returnTimestamp;
    private boolean isReturned;

    @Transient
    private double fee;

    @Transient
    private long overtime;
}
