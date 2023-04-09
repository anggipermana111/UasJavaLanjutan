package com.movie.movie.controller;

import com.movie.movie.controller.dto.LoginDto;
import com.movie.movie.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class LoginController {

    AuthService authService;

    @Autowired
    LoginController(AuthService authService) { this.authService = authService; }

    @PostMapping("/login")
    public Object create (@RequestBody LoginDto dto) {
        try {
            return authService.authenticate(dto);
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
}