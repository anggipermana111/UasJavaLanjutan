package com.movie.movie.repository;

import com.movie.movie.model.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule, Integer> {
    @Query("select s from Schedule s where s.movie.id=:movieId")
    public List<Schedule> findStudioByMovieId(Integer movieId);
}
