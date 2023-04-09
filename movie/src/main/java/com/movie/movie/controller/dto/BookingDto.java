package com.movie.movie.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingDto {
    private Integer idSeat;
    private Integer idCustomer;
    private Integer idSchedules;
}
