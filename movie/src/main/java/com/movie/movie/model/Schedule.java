package com.movie.movie.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne(fetch = FetchType.EAGER)
    private Movie movie;
    @ManyToOne(fetch = FetchType.EAGER)
    private Studio studio;
    @Column(name="dates", nullable = false)
    private String dates;
    @Column(name="hours", nullable = false)
    private String hours;
}
