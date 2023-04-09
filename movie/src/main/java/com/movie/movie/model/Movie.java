package com.movie.movie.model;

import javax.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name="title", nullable = false)
    private String title;
    @Column(name="poster", nullable = false)
    private String poster;
    @Column(name="rating", nullable = false)
    private String rating;
    @Column(name="synopsis", nullable = false)
    private String synopsis;
    @Column(name="director", nullable = false)
    private String director;
    @Column(name="duration", nullable = false)
    private String duration;
    @ManyToMany(mappedBy = "movies")
    @Column(name="genres", nullable = false)
    private List<Genre> genres;
    @Column(name="trailer", nullable = false)
    private String trailer;
}
