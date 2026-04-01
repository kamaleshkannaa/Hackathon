package com.example.busbackend.dto.seat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SeatResponseDTO {
    private Long id;
    private Long busId;
    private String seatNumber;
    private String seatType;
}
