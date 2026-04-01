package com.example.busbackend.service;

import com.example.busbackend.entity.Route;
import com.example.busbackend.exception.ResourceNotFoundException;
import com.example.busbackend.repository.RouteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RouteService {

    private final RouteRepository routeRepository;

    public Route addRoute(Route route) {
        return routeRepository.save(route);
    }

    public List<Route> getAllRoutes() {
        return routeRepository.findAll();
    }

    public Route getRouteById(Long id) {
        return routeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Route not found with ID: " + id));
    }

    public Route updateRoute(Long id, Route routeDetails) {
        Route route = getRouteById(id);
        route.setSource(routeDetails.getSource());
        route.setDestination(routeDetails.getDestination());
        route.setDistance(routeDetails.getDistance());
        return routeRepository.save(route);
    }

    public void deleteRoute(Long id) {
        if (!routeRepository.existsById(id)) {
            throw new ResourceNotFoundException("Route not found with ID: " + id);
        }
        routeRepository.deleteById(id);
    }
}
