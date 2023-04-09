package com.movie.movie.controller;

import com.movie.movie.controller.dto.CustomerDto;
import com.movie.movie.model.Customer;
import com.movie.movie.repository.CustomerRepository;
import com.movie.movie.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/customer")
public class CustomerController {
    CustomerRepository customerRepository;
    CustomerService customerService;

    @Autowired
    public CustomerController(CustomerRepository customerRepository, CustomerService customerService) {
        this.customerRepository= customerRepository;
        this.customerService = customerService;
    }

    @GetMapping("/find-all-customer")
    public  Object findAll() {
        return customerRepository.findAll();
    }

    @PostMapping("/register")
    public Object register(@RequestBody CustomerDto dto) {
        Customer customer = customerRepository.findByUsername(dto.getUsername()).orElse(null);
        if(customer == null) {
            customerService.register(dto);
            return ResponseEntity.ok().body("Successfully register user!");
        }
        return ResponseEntity.badRequest().body("Username already exist");
    }

    @PutMapping("/{id}")
    public Object update(@PathVariable("id") Integer id,
                         @RequestBody CustomerDto customerDto) {
        Customer customer = customerRepository.findById(id).orElse(null);
        if(customer == null) {
            return ResponseEntity.badRequest().body("ID customer not found");
        }
        customer.setCustomerName(customerDto.getCustomerName());
        customer.setUsername(customerDto.getUsername());
        customer.setPassword(customerDto.getPassword());
        return ResponseEntity.ok(customerRepository.save(customer));
    }

    @DeleteMapping("/{id}")
    public Object delete(@PathVariable("id") Integer id) {
        // check if id exist
        Customer customer = customerRepository.findById(id).orElse(null);
        if(customer == null) {
            return ResponseEntity.badRequest().body("ID customer not found");
        }
        customerRepository.delete(customer);
        return null;
    }
}
