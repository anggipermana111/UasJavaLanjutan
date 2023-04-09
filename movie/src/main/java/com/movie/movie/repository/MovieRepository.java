package com.movie.movie.repository;

import com.movie.movie.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, Integer> {

    @Query("select u from Movie u where u.id in(select s.movie.id from Schedule s)")
    List<Movie> findMovieBySchedule();
}
