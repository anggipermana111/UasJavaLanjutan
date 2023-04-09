package com.movie.movie.controller;

import com.movie.movie.controller.dto.ScheduleDto;
import com.movie.movie.model.Movie;
import com.movie.movie.model.Schedule;
import com.movie.movie.model.Studio;
import com.movie.movie.repository.MovieRepository;
import com.movie.movie.repository.ScheduleRepository;
import com.movie.movie.repository.StudioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/schedules")
public class ScheduleController {

    ScheduleRepository scheduleRepository;
    MovieRepository movieRepository;
    StudioRepository studioRepository;

    @Autowired
    public ScheduleController(ScheduleRepository scheduleRepository, MovieRepository movieRepository, StudioRepository studioRepository) {
        this.scheduleRepository = scheduleRepository;
        this.movieRepository = movieRepository;
        this.studioRepository = studioRepository;
    }

    @GetMapping("/find-all-schedule")
    public  Object findAll() {
        return scheduleRepository.findAll();
    }
    
    @GetMapping("/{id}")
    public Object getbyId(@PathVariable("id") Integer id) {
        Schedule schedule = scheduleRepository.findById(id).orElse(null);
        if(schedule == null) {
            return ResponseEntity.badRequest().body("ID schedule not found");
        }
        return scheduleRepository.findById(id).orElse(null);
    }

    @GetMapping("/find-studio-by-movie-id={id}")
    public List<Schedule> getStudioByMovieId(@PathVariable("id") Integer id) {
        List<Schedule> schedules = scheduleRepository.findStudioByMovieId(id);
        return schedules;
    }

//    @GetMapping("/get-studio-by-id-movie{id}")
//    public List<Studio> getStudioByIdMovie(@PathVariable("id") Integer id) {
//        List<Studio> schedules = scheduleRepository.findStudioByIdMovie(id);
//        return schedules;
//    }

    @PostMapping("/")
    public Object create(@RequestBody ScheduleDto scheduleDto) {
        //check movie
        Movie movie = movieRepository.findById(scheduleDto.getIdMovie()).orElse(null);
        if(movie == null) {
            return ResponseEntity.badRequest().body("ID movie not found");
        }
        //check studio
        Studio studio = studioRepository.findById(scheduleDto.getIdStudio()).orElse(null);
        if(studio == null) {
            return ResponseEntity.badRequest().body("ID studio not found");
        }
        Schedule schedule = new Schedule();
        schedule.setMovie(movie);
        schedule.setDates(scheduleDto.getDates());
        schedule.setHours(scheduleDto.getHours());
        schedule.setStudio(studio);
        return scheduleRepository.save(schedule);
    }

    @PutMapping("/{id}")
    public Object update(@PathVariable("id") Integer id,
                         @RequestBody ScheduleDto scheduleDto) {
        Schedule schedule = scheduleRepository.findById(id).orElse(null);
        if(schedule == null) {
            return ResponseEntity.badRequest().body("ID schedule not found");
        }
        Movie movie = movieRepository.findById(scheduleDto.getIdMovie()).orElse(null);
        if(movie == null) {
            return ResponseEntity.badRequest().body("ID movie not found");
        }
        Studio studio = studioRepository.findById(scheduleDto.getIdStudio()).orElse(null);
        if(studio == null) {
            return ResponseEntity.badRequest().body("ID studio not found");
        }
        schedule.setMovie(movie);
        schedule.setDates(scheduleDto.getDates());
        schedule.setHours(scheduleDto.getHours());
        schedule.setStudio(studio);
        return scheduleRepository.save(schedule);
    }

    @DeleteMapping("/{id}")
    public Object delete(@PathVariable("id") Integer id) {
        // check if id exist
        Schedule schedule = scheduleRepository.findById(id).orElse(null);
        if(schedule == null) {
            return ResponseEntity.badRequest().body("ID schedule not found");
        }
        scheduleRepository.delete(schedule);
        return null;
    }
}