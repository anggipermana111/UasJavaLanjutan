package com.movie.movie.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MovieDto {
    private String title;
    private String poster;
    private String rating;
    private String synopsis;
    private String director;
    private String duration;
    private List<Integer> genreIds;
    private String trailer;
}
