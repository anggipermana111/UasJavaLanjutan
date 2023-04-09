package com.movie.movie.service;

import com.movie.movie.controller.dto.LoginDto;

public interface AuthService {
    String authenticate(LoginDto dto);
}
