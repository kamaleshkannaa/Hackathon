package com.example.busbackend.controller;

import com.example.busbackend.entity.BusSchedule;
import com.example.busbackend.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schedules")
@RequiredArgsConstructor
public class ScheduleController {

    private final ScheduleService scheduleService;

    @PostMapping
    public ResponseEntity<BusSchedule> addSchedule(@RequestBody BusSchedule schedule) {
        return ResponseEntity.ok(scheduleService.addSchedule(schedule));
    }

    @GetMapping
    public ResponseEntity<List<BusSchedule>> getAllSchedules() {
        return ResponseEntity.ok(scheduleService.getAllSchedules());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BusSchedule> getScheduleById(@PathVariable Long id) {
        return ResponseEntity.ok(scheduleService.getScheduleById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BusSchedule> updateSchedule(@PathVariable Long id, @RequestBody BusSchedule scheduleDetails) {
        return ResponseEntity.ok(scheduleService.updateSchedule(id, scheduleDetails));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSchedule(@PathVariable Long id) {
        scheduleService.deleteSchedule(id);
        return ResponseEntity.noContent().build();
    }
}
