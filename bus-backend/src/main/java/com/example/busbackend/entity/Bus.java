package com.example.busbackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "buses")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "bus_name", nullable = false)
    private String busName;

    @Column(name = "bus_type", nullable = false)
    private String busType; // AC/Non-AC/Sleeper

    @Column(name = "total_seats")
    private Integer totalSeats;

    @OneToMany(mappedBy = "bus", cascade = CascadeType.ALL)
    private List<Seat> seats;

    @OneToMany(mappedBy = "bus", cascade = CascadeType.ALL)
    private List<BusSchedule> schedules;
}
