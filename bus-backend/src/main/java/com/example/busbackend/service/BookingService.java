package com.example.busbackend.service;

import com.example.busbackend.dto.bookings.BookingRequestDTO;
import com.example.busbackend.dto.bookings.BookingResponseDTO;
import com.example.busbackend.entity.*;
import com.example.busbackend.exception.BadRequestException;
import com.example.busbackend.exception.ResourceNotFoundException;
import com.example.busbackend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final BookingSeatRepository bookingSeatRepository;
    private final ScheduleRepository scheduleRepository;
    private final SeatRepository seatRepository;
    private final UserRepository userRepository;

    @Transactional
    public BookingResponseDTO createBooking(Long userId, BookingRequestDTO request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        BusSchedule schedule = scheduleRepository.findById(request.getScheduleId())
                .orElseThrow(() -> new ResourceNotFoundException("Bus Schedule not found"));

        List<Seat> requestedSeats = seatRepository.findAllById(request.getSeatIds());
        if (requestedSeats.size() != request.getSeatIds().size()) {
            throw new BadRequestException("One or more seats not found");
        }

        for (Seat seat : requestedSeats) {
            // Check if seat is already booked for this specific schedule
            boolean isAlreadyBooked = bookingSeatRepository.existsBySeatIdAndBooking_Schedule_IdAndBooking_Status(
                    seat.getId(), schedule.getId(), Booking.BookingStatus.BOOKED);
            
            if (isAlreadyBooked) {
                throw new BadRequestException("Seat " + seat.getSeatNumber() + " is already booked for this schedule");
            }
            
            if (!seat.getBus().getId().equals(schedule.getBus().getId())) {
                throw new BadRequestException("Seat " + seat.getSeatNumber() + " does not belong to the scheduled bus");
            }
        }

        BigDecimal totalAmount = schedule.getPrice().multiply(BigDecimal.valueOf(requestedSeats.size()));

        Booking booking = Booking.builder()
                .user(user)
                .schedule(schedule)
                .totalAmount(totalAmount)
                .status(Booking.BookingStatus.BOOKED)
                .build();

        Booking savedBooking = bookingRepository.save(booking);

        List<BookingSeat> bookingSeats = new ArrayList<>();
        for (Seat seat : requestedSeats) {
            BookingSeat bookingSeat = BookingSeat.builder()
                    .booking(savedBooking)
                    .seat(seat)
                    .build();
            bookingSeats.add(bookingSeat);
        }

        bookingSeatRepository.saveAll(bookingSeats);

        return mapToResponseDTO(savedBooking, requestedSeats.stream().map(Seat::getSeatNumber).collect(Collectors.toList()));
    }

    public List<BookingResponseDTO> getUserBookings(Long userId) {
        return bookingRepository.findByUser_Id(userId).stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    public BookingResponseDTO getBookingById(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
        return mapToResponseDTO(booking);
    }

    @Transactional
    public void cancelBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        if (booking.getStatus() == Booking.BookingStatus.CANCELLED) {
            throw new BadRequestException("Booking is already cancelled");
        }

        booking.setStatus(Booking.BookingStatus.CANCELLED);
        bookingRepository.save(booking);
    }

    private BookingResponseDTO mapToResponseDTO(Booking booking) {
        List<String> seatNumbers = booking.getBookingSeats().stream()
                .map(bs -> bs.getSeat().getSeatNumber())
                .collect(Collectors.toList());
        return mapToResponseDTO(booking, seatNumbers);
    }

    private BookingResponseDTO mapToResponseDTO(Booking booking, List<String> seatNumbers) {
        return BookingResponseDTO.builder()
                .id(booking.getId())
                .userId(booking.getUser().getId())
                .username(booking.getUser().getEmail())
                .scheduleId(booking.getSchedule().getId())
                .totalAmount(booking.getTotalAmount())
                .status(booking.getStatus().name())
                .bookingTime(booking.getBookingTime())
                .seatNumbers(seatNumbers)
                .build();
    }
}
