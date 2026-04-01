package com.example.busbackend.service;

import com.example.busbackend.entity.Seat;
import com.example.busbackend.exception.ResourceNotFoundException;
import com.example.busbackend.repository.SeatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SeatService {

    private final SeatRepository seatRepository;

    public Seat addSeat(Seat seat) {
        return seatRepository.save(seat);
    }

    public List<Seat> getSeatsByBus(Long busId) {
        return seatRepository.findByBusId(busId);
    }

    public Seat getSeatById(Long id) {
        return seatRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Seat not found with ID: " + id));
    }
}
