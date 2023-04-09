package com.movie.movie.controller;

import com.movie.movie.controller.dto.BookingDto;
import com.movie.movie.controller.dto.SeatDto;
import com.movie.movie.model.*;
import com.movie.movie.repository.BookingRepository;
import com.movie.movie.repository.CustomerRepository;
import com.movie.movie.repository.ScheduleRepository;
import com.movie.movie.repository.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/booking")
public class BookingController {

    BookingRepository bookingRepository;
    SeatRepository seatRepository;
    CustomerRepository customerRepository;
    ScheduleRepository scheduleRepository;

    @Autowired
    public BookingController(BookingRepository bookingRepository, SeatRepository seatRepository,
                             CustomerRepository customerRepository, ScheduleRepository scheduleRepository) {
        this.bookingRepository =bookingRepository;
        this.seatRepository = seatRepository;
        this.customerRepository = customerRepository;
        this.scheduleRepository = scheduleRepository;
    }

    @GetMapping("/find-all-booking")
    public List<Booking> findAll() {
        return bookingRepository.findAll();
    }

    @PostMapping("/")
    public Object create(@RequestBody BookingDto bookingDto) {
        //check movie
        Seat seat = seatRepository.findById(bookingDto.getIdSeat()).orElse(null);
        if(seat == null) {
            return ResponseEntity.badRequest().body("ID seat not found");
        }
//        List<Seat> seats = seatRepository.findSeatBooked(bookingDto.getIdSeat());

        //check customer
        Customer customer = customerRepository.findById(bookingDto.getIdCustomer()).orElse(null);
        if(customer == null) {
            return ResponseEntity.badRequest().body("ID customer not found");
        }
        //check schedule
        Schedule schedule = scheduleRepository.findById(bookingDto.getIdSchedules()).orElse(null);
        if(schedule == null) {
            return ResponseEntity.badRequest().body("ID schedule not found");
        }
        Booking booking = new Booking();
        booking.setSeat(seat);
        booking.setCustomer(customer);
        booking.setSchedule(schedule);
        return bookingRepository.save(booking);
    }

    @PutMapping("/{id}")
    public Object update(@PathVariable("id") Integer id,
                         @RequestBody BookingDto bookingDto) {
        Booking booking = bookingRepository.findById(id).orElse(null);
        if(booking == null) {
            return ResponseEntity.badRequest().body("ID booking not found");
        }
        Seat seat = seatRepository.findById(bookingDto.getIdSeat()).orElse(null);
        if(seat == null) {
            return ResponseEntity.badRequest().body("ID seat not found");
        }
        Customer customer = customerRepository.findById(bookingDto.getIdCustomer()).orElse(null);
        if(customer == null) {
            return ResponseEntity.badRequest().body("ID customer not found");
        }
        Schedule schedule = scheduleRepository.findById(bookingDto.getIdSchedules()).orElse(null);
        if(schedule == null) {
            return ResponseEntity.badRequest().body("ID schedule not found");
        }
        booking.setSeat(seat);
        booking.setCustomer(customer);
        booking.setSchedule(schedule);
        return bookingRepository.save(booking);
    }

    @DeleteMapping("/{id}")
    public Object delete(@PathVariable("id") Integer id) {
        // check if id exist
        Booking booking = bookingRepository.findById(id).orElse(null);
        if(booking == null) {
            return ResponseEntity.badRequest().body("ID booking not found");
        }
        bookingRepository.delete(booking);
        return null;
    }
}
