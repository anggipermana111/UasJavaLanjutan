package com.movie.movie.service;

import com.movie.movie.auth.JwtConfig;
import com.movie.movie.controller.dto.LoginDto;
import com.movie.movie.model.Customer;
import com.movie.movie.repository.CustomerRepository;
import com.movie.movie.util.PasswordHashUtil;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;

@Service
public class AuthServiceImpl implements AuthService{

    CustomerRepository customerRepository;

    JwtConfig jwtConfig;

    @Autowired
    AuthServiceImpl(CustomerRepository customerRepository, JwtConfig jwtConfig){
        this.customerRepository = customerRepository;
        this.jwtConfig = jwtConfig;
    }

    @Override
    public String authenticate(LoginDto dto) {
        Customer customer = customerRepository.findByUsername(dto.getUsername()).orElse(null);
        //// check username
        if(customer == null) {
            throw new BadCredentialsException("Invalid username or password");
        }
        //// check password with hash
        if(!PasswordHashUtil.generate(dto.getPassword()).equals(customer.getPassword())) {
            throw  new BadCredentialsException(("Invalid username or password"));
        }

        return Jwts.builder()
                .setSubject(dto.getUsername())
                .claim("authorities", new ArrayList<>())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtConfig.getExpiration() * 1000L))
                .signWith(SignatureAlgorithm.HS512, jwtConfig.getSecret().getBytes())
                .compact();
    }
}