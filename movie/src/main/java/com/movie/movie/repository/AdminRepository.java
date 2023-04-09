package com.movie.movie.repository;

import com.movie.movie.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Integer> {

    @Query("select u from Admin u where u.username=:username")
    Optional<Admin> findByUsername(String username);
    @Query("select u from Admin u where u.password=:password")
    Optional<Admin> findByPassword(String password);
}
