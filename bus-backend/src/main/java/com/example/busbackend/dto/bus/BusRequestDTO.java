package com.example.busbackend.dto.bus;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BusRequestDTO {
    @NotBlank(message = "Bus name is required")
    private String busName;

    @NotBlank(message = "Bus type is required")
    private String busType; // AC/Non-AC/Sleeper

    @Min(value = 1, message = "Total seats must be at least 1")
    private Integer totalSeats;
}
