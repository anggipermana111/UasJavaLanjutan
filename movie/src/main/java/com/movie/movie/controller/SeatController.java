package com.movie.movie.controller;

import com.movie.movie.controller.dto.SeatDto;
import com.movie.movie.model.Seat;
import com.movie.movie.repository.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/seat")
public class SeatController {
    SeatRepository seatRepository;

    @Autowired
    public SeatController (SeatRepository seatRepository) {
        this.seatRepository = seatRepository;
    }

    @GetMapping("/find-all-seat")
    public Object findAll() {
        return seatRepository.findAll();
    }

    @GetMapping("/find-seat-booked={id}")
    public Object getSeatBooked(@PathVariable("id") Integer id) {
        return seatRepository.findSeatBooked(id);
    }

    @GetMapping("/{id}")
    public Object getbyId(@PathVariable("id") Integer id) {
        Seat seat = seatRepository.findById(id).orElse(null);
        if(seat == null) {
            return ResponseEntity.badRequest().body("ID seat not found");
        }
        return seatRepository.findById(id).orElse(null);
    }
    
    @PostMapping("/")
    public Object create(@RequestBody SeatDto seatDto) {
        Seat seat = new Seat();
        seat.setNumber(seatDto.getNumber());
        return seatRepository.save(seat);
    }

    @PutMapping("/{id}")
    public Object update(@PathVariable("id") Integer id,
                         @RequestBody SeatDto seatDto) {
        Seat seat = seatRepository.findById(id).orElse(null);
        if(seat == null) {
            return ResponseEntity.badRequest().body("ID seat not found");
        }
        seat.setNumber(seatDto.getNumber());
        return ResponseEntity.ok(seatRepository.save(seat));
    }

    @DeleteMapping("/{id}")
    public Object delete(@PathVariable("id") Integer id) {
        // check if id exist
        Seat seat = seatRepository.findById(id).orElse(null);
        if(seat == null) {
            return ResponseEntity.badRequest().body("ID seat not found");
        }
        seatRepository.delete(seat);
        return null;
    }
}