package com.example.busbackend.dto.seat;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SeatRequestDTO {
    @NotNull(message = "Bus ID is required")
    private Long busId;

    @NotBlank(message = "Seat number is required")
    private String seatNumber;

    @NotBlank(message = "Seat type is required")
    private String seatType; // window/aisle/sleeper
}
