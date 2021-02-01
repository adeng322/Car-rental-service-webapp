package com.crs.backend.repo;

import com.crs.backend.model.Customer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer>{

    Customer findByCustomerId(String customerId);
}
