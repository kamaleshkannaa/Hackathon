package com.example.busbackend.dto.bookings;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingResponseDTO {
    private Long id;
    private Long userId;
    private String username;
    private Long scheduleId;
    private BigDecimal totalAmount;
    private String status;
    private LocalDateTime bookingTime;
    private List<String> seatNumbers;
}
