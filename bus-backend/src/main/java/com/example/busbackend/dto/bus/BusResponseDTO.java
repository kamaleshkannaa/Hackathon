package com.example.busbackend.dto.bus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BusResponseDTO {
    private Long id;
    private String busName;
    private String busType;
    private Integer totalSeats;
}
