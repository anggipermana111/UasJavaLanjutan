package com.movie.movie.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleDto {
    private Integer idMovie;
    private Integer idStudio;
    private String dates;
    private String hours;
}
