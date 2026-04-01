package com.example.busbackend.controller;

import com.example.busbackend.dto.bookings.BookingRequestDTO;
import com.example.busbackend.dto.bookings.BookingResponseDTO;
import com.example.busbackend.dto.common.ApiResponse;
import com.example.busbackend.security.UserPrincipal;
import com.example.busbackend.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<BookingResponseDTO> createBooking(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestBody BookingRequestDTO request) {
        return ResponseEntity.ok(bookingService.createBooking(userPrincipal.getUser().getId(), request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookingResponseDTO> getBookingById(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.getBookingById(id));
    }

    @GetMapping("/me")
    public ResponseEntity<List<BookingResponseDTO>> getMyBookings(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        return ResponseEntity.ok(bookingService.getUserBookings(userPrincipal.getUser().getId()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> cancelBooking(@PathVariable Long id) {
        bookingService.cancelBooking(id);
        ApiResponse<Void> response = new ApiResponse<>(true, "Booking cancelled successfully", null);
        return ResponseEntity.ok(response);
    }
}
