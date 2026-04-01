package com.example.busbackend.config;

// Importing custom JWT filter which will validate token on each request
import com.example.busbackend.security.JwtFilter;

// Spring configuration annotations
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// Authentication related classes
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;

// Enable method-level security annotations like @PreAuthorize
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

// Security configuration classes
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;

// User details and password encoding
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;

// Security filter chain and filter
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// Marks this class as a configuration class
@Configuration

// Enables Spring Security for the application
@EnableWebSecurity

// Enables method-level security (like role-based annotations)
@EnableMethodSecurity
public class SecurityConfig {

    // Custom JWT filter to validate token in every request
    private final JwtFilter jwtFilter;

    // Loads user details from database
    private final UserDetailsService userDetailsService;

    // Password encoder (BCrypt) for hashing and matching passwords
    private final PasswordEncoder passwordEncoder;

    // Constructor injection (Spring automatically injects dependencies)
    public SecurityConfig(JwtFilter jwtFilter, UserDetailsService userDetailsService, PasswordEncoder passwordEncoder) {
        this.jwtFilter = jwtFilter;
        this.userDetailsService = userDetailsService;
        this.passwordEncoder = passwordEncoder;
    }

    // Main security configuration method
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Disable CSRF (not required for REST APIs)
                .csrf(AbstractHttpConfigurer::disable)

                // Define which APIs are public and which require authentication
                .authorizeHttpRequests(auth -> auth
                        // Public endpoints (no authentication required)
                        .requestMatchers("/api/auth/**", "/v3/api-docs/**", "/swagger-ui/**").permitAll()

                        // All other endpoints require authentication
                        .anyRequest().authenticated())

                // Configure session management to be stateless (no server session)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // Set custom authentication provider
                .authenticationProvider(authenticationProvider())

                // Add JWT filter before default username-password filter
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        // Build and return security configuration
        return http.build();
    }

    // Authentication provider that uses database (DAO) for authentication
    @Bean
    public AuthenticationProvider authenticationProvider() {

        // Create DAO authentication provider with userDetailsService
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider(userDetailsService);

        // Set password encoder (BCrypt)
        authProvider.setPasswordEncoder(passwordEncoder);

        return authProvider;
    }

    // comment

    // Authentication manager used during login process
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {

        // Returns default authentication manager configured by Spring
        return config.getAuthenticationManager();
    }
}