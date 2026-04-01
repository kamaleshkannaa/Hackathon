package com.example.busbackend.service;

import com.example.busbackend.entity.Bus;
import com.example.busbackend.exception.ResourceNotFoundException;
import com.example.busbackend.repository.BusRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BusService {

    private final BusRepository busRepository;

    public Bus addBus(Bus bus) {
        return busRepository.save(bus);
    }

    public List<Bus> getAllBuses() {
        return busRepository.findAll();
    }

    public Bus getBusById(Long id) {
        return busRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bus not found with ID: " + id));
    }

    public Bus updateBus(Long id, Bus busDetails) {
        Bus bus = getBusById(id);
        bus.setBusName(busDetails.getBusName());
        bus.setBusType(busDetails.getBusType());
        bus.setTotalSeats(busDetails.getTotalSeats());
        return busRepository.save(bus);
    }

    public void deleteBus(Long id) {
        if (!busRepository.existsById(id)) {
            throw new ResourceNotFoundException("Bus not found with ID: " + id);
        }
        busRepository.deleteById(id);
    }
}
