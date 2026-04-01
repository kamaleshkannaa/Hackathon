package com.example.busbackend.controller;

import com.example.busbackend.entity.Seat;
import com.example.busbackend.service.SeatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seats")
@RequiredArgsConstructor
public class SeatController {

    private final SeatService seatService;

    @PostMapping
    public ResponseEntity<Seat> addSeat(@RequestBody Seat seat) {
        return ResponseEntity.ok(seatService.addSeat(seat));
    }

    @GetMapping("/bus/{busId}")
    public ResponseEntity<List<Seat>> getSeatsByBus(@PathVariable Long busId) {
        return ResponseEntity.ok(seatService.getSeatsByBus(busId));
    }
}
