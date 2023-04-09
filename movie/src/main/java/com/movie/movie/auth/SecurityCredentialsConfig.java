package com.movie.movie.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.channel.ChannelProcessingFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
public class SecurityCredentialsConfig {

    JwtConfig jwtConfig;

    CorsFilter corsFilter;

    @Autowired
    SecurityCredentialsConfig(JwtConfig jwtConfig, CorsFilter corsFilter) {

        this.jwtConfig = jwtConfig;
        this.corsFilter = corsFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf()
                .disable()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .exceptionHandling()
                .and()
                .addFilterBefore(corsFilter, ChannelProcessingFilter.class)
                .authorizeRequests()
                .and()
                .addFilterAfter(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
                .authorizeRequests()
                .antMatchers (HttpMethod.POST, jwtConfig.getUrl())
                .permitAll()
                .antMatchers (HttpMethod.POST, "/customer/register", "/admin/login", "/movie/", "/genre/", "/seat/", "/booking/", "/schedules/")
                .permitAll()
                .antMatchers("/customer/**/*", "/admin/**/*","/genre/**/*", "/movie/**/*", "/schedules/**/*", "/seat/**/*", "/studio/**/*", "/booking/**/*")
                .permitAll()
                .anyRequest()
                .authenticated();
        return http.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().antMatchers(
                "/swagger-ui/**",
                "/swagger-resources/**",
                "/v3/api-docs/**",
                "/v2/api-docs",
                "/configuration/ui",
                "/configuration/security");
    }

    private JwtAuthenticationFilter jwtAuthenticationFilter () {
        return new JwtAuthenticationFilter(jwtConfig);
    }
}
