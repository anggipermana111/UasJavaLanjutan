package com.movie.movie.controller;

import com.movie.movie.controller.dto.GenreDto;
import com.movie.movie.model.Genre;
import com.movie.movie.repository.GenreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/genre")
public class GenreController {

    GenreRepository genreRepository;

    @Autowired
    public GenreController(GenreRepository genreRepository) {
        this.genreRepository = genreRepository;
    }

    @GetMapping("/find-all")
    public Object findAll() {
        return genreRepository.findAll();
    }
    
    @GetMapping("/{id}")
    public Object getbyId(@PathVariable("id") Integer id) {
        Genre genre = genreRepository.findById(id).orElse(null);
        if(genre == null) {
            return ResponseEntity.badRequest().body("ID genre not found");
        }
        return genreRepository.findById(id).orElse(null);
    }
    
    @PostMapping("/")
    public Object create(@RequestBody GenreDto genreDto) {
        Genre genre = new Genre();
        genre.setGenreName(genreDto.getGenreName());
        return genreRepository.save(genre);
    }

    @PutMapping("/{id}")
    public Object update(@PathVariable("id") Integer id,
                         @RequestBody GenreDto genreDto) {
        Genre genre = genreRepository.findById(id).orElse(null);
        if(genre == null) {
            return ResponseEntity.badRequest().body("ID genre not found");
        }
        genre.setGenreName(genreDto.getGenreName());
        return ResponseEntity.ok(genreRepository.save(genre));
    }

    @DeleteMapping("/{id}")
    public Object delete(@PathVariable("id") Integer id) {
        // check if id exist
        Genre genre = genreRepository.findById(id).orElse(null);
        if(genre == null) {
            return ResponseEntity.badRequest().body("ID genre not found");
        }
        genreRepository.delete(genre);
        return null;
    }
}