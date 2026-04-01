package com.example.busbackend.util;

import com.example.busbackend.dto.bus.BusResponseDTO;
import com.example.busbackend.dto.route.RouteResponseDTO;
import com.example.busbackend.dto.schedule.ScheduleResponseDTO;
import com.example.busbackend.dto.seat.SeatResponseDTO;
import com.example.busbackend.entity.Bus;
import com.example.busbackend.entity.BusSchedule;
import com.example.busbackend.entity.Route;
import com.example.busbackend.entity.Seat;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class MapperUtil {

    public BusResponseDTO toBusResponse(Bus bus) {
        if (bus == null) return null;
        return BusResponseDTO.builder()
                .id(bus.getId())
                .busName(bus.getBusName())
                .busType(bus.getBusType())
                .totalSeats(bus.getTotalSeats())
                .build();
    }

    public List<BusResponseDTO> toBusResponseList(List<Bus> buses) {
        return buses.stream().map(this::toBusResponse).collect(Collectors.toList());
    }

    public RouteResponseDTO toRouteResponse(Route route) {
        if (route == null) return null;
        return RouteResponseDTO.builder()
                .id(route.getId())
                .source(route.getSource())
                .destination(route.getDestination())
                .distance(route.getDistance())
                .build();
    }

    public List<RouteResponseDTO> toRouteResponseList(List<Route> routes) {
        return routes.stream().map(this::toRouteResponse).collect(Collectors.toList());
    }

    public ScheduleResponseDTO toScheduleResponse(BusSchedule schedule) {
        if (schedule == null) return null;
        return ScheduleResponseDTO.builder()
                .id(schedule.getId())
                .bus(toBusResponse(schedule.getBus()))
                .route(toRouteResponse(schedule.getRoute()))
                .travelDate(schedule.getTravelDate())
                .departureTime(schedule.getDepartureTime())
                .arrivalTime(schedule.getArrivalTime())
                .price(schedule.getPrice())
                .build();
    }

    public List<ScheduleResponseDTO> toScheduleResponseList(List<BusSchedule> schedules) {
        return schedules.stream().map(this::toScheduleResponse).collect(Collectors.toList());
    }

    public SeatResponseDTO toSeatResponse(Seat seat) {
        if (seat == null) return null;
        return SeatResponseDTO.builder()
                .id(seat.getId())
                .busId(seat.getBus() != null ? seat.getBus().getId() : null)
                .seatNumber(seat.getSeatNumber())
                .seatType(seat.getSeatType())
                .build();
    }

    public List<SeatResponseDTO> toSeatResponseList(List<Seat> seats) {
        return seats.stream().map(this::toSeatResponse).collect(Collectors.toList());
    }
}
