package com.movie.movie.config;

import com.movie.movie.auth.JwtConfig;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApplicationConfig {

    @Bean
    public JwtConfig jwtConfig() {
        return new JwtConfig();
    }
}
