package com.movie.movie.repository;

import com.movie.movie.model.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SeatRepository extends JpaRepository<Seat, Integer> {
    @Query("select s from Seat s where s.id in(select b.seat.id from Booking b where b.schedule.id=:scheduleId) order by s.id")
    public List<Seat> findSeatBooked(Integer scheduleId);
}
