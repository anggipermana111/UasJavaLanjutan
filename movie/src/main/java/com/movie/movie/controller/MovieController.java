package com.movie.movie.controller;

import com.movie.movie.controller.dto.MovieDto;
import com.movie.movie.model.Genre;
import com.movie.movie.model.Movie;
import com.movie.movie.repository.GenreRepository;
import com.movie.movie.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/movie")
public class MovieController {

    MovieRepository movieRepository;
    GenreRepository genreRepository;

    @Autowired
    public MovieController(MovieRepository movieRepository, GenreRepository genreRepository) {
        this.movieRepository = movieRepository;
        this.genreRepository = genreRepository;
    }

    @GetMapping("/find-all-movie")
    public  Object findAll() {
        return movieRepository.findAll();
    }

    @GetMapping("/find-movie-by-schedule")
    public  Object findMovieBySchedule() {
        return movieRepository.findMovieBySchedule();
    }

    @GetMapping("/{id}")
    public Object getbyId(@PathVariable("id") Integer id) {
        Movie movie = movieRepository.findById(id).orElse(null);
        if(movie == null) {
            return ResponseEntity.badRequest().body("ID movie not found");
        }
        return movieRepository.findById(id).orElse(null);
    }

    @PostMapping("/")
    public Object create(@RequestBody MovieDto movieDto) {
        Movie movie = new Movie();
        movie.setTitle(movieDto.getTitle());
        movie.setPoster(movieDto.getPoster());
        movie.setRating(movieDto.getRating());
        movie.setSynopsis(movieDto.getSynopsis());
        movie.setDirector(movieDto.getDirector());
        movie.setDuration(movieDto.getDuration());
        List<Genre> genres = new ArrayList<>();
        for (Integer genreId:movieDto.getGenreIds()) {
            genres.add(genreRepository.findById(genreId).orElse(null));
        }
        movie.setGenres(genres);
        movie.setTrailer(movieDto.getTrailer());
        return movieRepository.save(movie);
    }

    @PutMapping("/{id}")
    public Object update(@PathVariable("id") Integer id,
                         @RequestBody MovieDto movieDto) {
        Movie movie = movieRepository.findById(id).orElse(null);
        if(movie == null) {
            return ResponseEntity.badRequest().body("ID movie not found");
        }
        movie.setTitle(movieDto.getTitle());
        movie.setPoster(movieDto.getPoster());
        movie.setRating(movieDto.getRating());
        movie.setSynopsis(movieDto.getSynopsis());
        movie.setDirector(movieDto.getDirector());
        movie.setDuration(movieDto.getDuration());
        List<Genre> genres = new ArrayList<>();
        for (Integer genreId:movieDto.getGenreIds()) {
            genres.add(genreRepository.findById(genreId).orElse(null));
        }
        movie.setGenres(genres);
        movie.setTrailer(movie.getTrailer());
        return ResponseEntity.ok(movieRepository.save(movie));
    }

    @DeleteMapping("/{id}")
    public Object delete(@PathVariable("id") Integer id) {
        // check if id exist
        Movie movie = movieRepository.findById(id).orElse(null);
        if(movie == null) {
            return ResponseEntity.badRequest().body("ID movie not found");
        }
        movieRepository.delete(movie);
        return null;
    }
}