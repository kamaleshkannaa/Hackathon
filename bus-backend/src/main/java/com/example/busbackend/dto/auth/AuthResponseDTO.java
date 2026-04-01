package com.example.busbackend.dto.auth;

import com.example.busbackend.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponseDTO {
    private String token; // Optional but good for later
    private Long id;
    private String name;
    private String email;
    private User.Role role;
}
