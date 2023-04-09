package com.movie.movie.controller;

import com.movie.movie.controller.dto.AdminDto;
import com.movie.movie.model.Admin;
import com.movie.movie.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/admin")
public class AdminController {

    AdminRepository adminRepository;

    @Autowired
    public AdminController (AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    @PostMapping("/login")
    public Object loginAdmin(@RequestBody AdminDto dto) {
        Admin adminUsername = adminRepository.findByUsername(dto.getUsername()).orElse(null);
        if(adminUsername == null) {
            return ResponseEntity.badRequest().body("Wrong username or password");
        }
        Admin adminPassword = adminRepository.findByPassword(dto.getPassword()).orElse(null);
        if(adminPassword == null) {
            return ResponseEntity.badRequest().body("Wrong username or password");
        }
        return ResponseEntity.ok().body("Successfully login as Admin!");
    }
}
