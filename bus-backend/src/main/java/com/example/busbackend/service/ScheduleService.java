package com.example.busbackend.service;

import com.example.busbackend.entity.BusSchedule;
import com.example.busbackend.exception.ResourceNotFoundException;
import com.example.busbackend.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;

    public BusSchedule addSchedule(BusSchedule schedule) {
        return scheduleRepository.save(schedule);
    }

    public List<BusSchedule> getAllSchedules() {
        return scheduleRepository.findAll();
    }

    public BusSchedule getScheduleById(Long id) {
        return scheduleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Schedule not found with ID: " + id));
    }

    public BusSchedule updateSchedule(Long id, BusSchedule scheduleDetails) {
        BusSchedule schedule = getScheduleById(id);
        schedule.setBus(scheduleDetails.getBus());
        schedule.setRoute(scheduleDetails.getRoute());
        schedule.setTravelDate(scheduleDetails.getTravelDate());
        schedule.setDepartureTime(scheduleDetails.getDepartureTime());
        schedule.setArrivalTime(scheduleDetails.getArrivalTime());
        schedule.setPrice(scheduleDetails.getPrice());
        return scheduleRepository.save(schedule);
    }

    public void deleteSchedule(Long id) {
        if (!scheduleRepository.existsById(id)) {
            throw new ResourceNotFoundException("Schedule not found with ID: " + id);
        }
        scheduleRepository.deleteById(id);
    }
}
