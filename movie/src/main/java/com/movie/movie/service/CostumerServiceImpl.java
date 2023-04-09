package com.movie.movie.service;

import com.movie.movie.controller.dto.CustomerDto;
import com.movie.movie.model.Customer;
import com.movie.movie.repository.CustomerRepository;
import com.movie.movie.util.PasswordHashUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CostumerServiceImpl implements CustomerService {
    CustomerRepository customerRepository;
    @Autowired
    public CostumerServiceImpl (CustomerRepository customerRepository) { this.customerRepository = customerRepository; }

    @Override
    public  void register (CustomerDto customerDto) {
        Customer customer = new Customer();

        customer.setCustomerName(customerDto.getCustomerName());
        customer.setUsername(customerDto.getUsername());
        customer.setPassword(PasswordHashUtil.generate(customerDto.getPassword()));

        customerRepository.save(customer);
    }
}
