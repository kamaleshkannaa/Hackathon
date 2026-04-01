package com.example.busbackend.dto.schedule;

import com.example.busbackend.dto.bus.BusResponseDTO;
import com.example.busbackend.dto.route.RouteResponseDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ScheduleResponseDTO {
    private Long id;
    private BusResponseDTO bus;
    private RouteResponseDTO route;
    private LocalDate travelDate;
    private LocalTime departureTime;
    private LocalTime arrivalTime;
    private BigDecimal price;
}
