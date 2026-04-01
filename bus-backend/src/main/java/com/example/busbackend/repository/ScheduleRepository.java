package com.example.busbackend.repository;

import com.example.busbackend.entity.BusSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<BusSchedule, Long> {
    List<BusSchedule> findByBusId(Long busId);
    List<BusSchedule> findByRouteId(Long routeId);
    
    List<BusSchedule> findByRoute_SourceAndRoute_DestinationAndTravelDate(String source, String destination, LocalDate travelDate);
}
