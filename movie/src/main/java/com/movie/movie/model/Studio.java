package com.movie.movie.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Studio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name="studio_name", nullable = false)
    private String studioName;
    @JsonIgnore
    @OneToMany
    private List<Schedule> schedule;
    @OneToMany
    private List<Seat> seats;
}
