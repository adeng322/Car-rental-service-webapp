package com.crs.backend.api;

import java.util.List;
import java.util.Random;

import com.crs.backend.model.Customer;
import com.crs.backend.repo.CustomerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("api/customers")
@RestController
@CrossOrigin
public class CustomerController {

    @Autowired
    private CustomerRepository customerRepository;

    @GetMapping("/")
    public List<Customer> getCustomers() {
        return customerRepository.findAll();
    }

    @GetMapping("/{customerId}")
    public Customer getCustomer(@PathVariable String customerId) {
        Customer customer = customerRepository.findByCustomerId(customerId);
        return customer;
    }

    @PostMapping("/")
    public Customer postCustomer(@RequestBody Customer customer) {
        Random rand = new Random();
        if (customer.getCustomerType().equals("gold")) {
            String customerId = "G" + String.valueOf(rand.nextInt(999999)) 
                + (char) ((int) 'A' + rand.nextInt(26))
                + (char) ((int) 'A' + rand.nextInt(26));
            customer.setCustomerId(customerId);
        }

        if (customer.getCustomerType().equals("regular")) {
            String customerId = "N" + String.valueOf(rand.nextInt(99999999));
            customer.setCustomerId(customerId);
        }

        return customerRepository.save(customer);
    }

}