package com.example.backend.auth;

import com.example.backend.dto.UserResponse;
import com.example.backend.security.JwtUtil;
import com.example.backend.user.User;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/auth")
public class AuthController {


    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public AuthController(AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    request.username,
                    request.password
            ));

            String token = jwtUtil.generateToken(
                    (UserDetails) authentication.getPrincipal()
            );

            return new LoginResponse(token);
        } catch (Exception e) {
            e.printStackTrace(); // 🔥 prints real cause
            throw e;
        }
    }

    @GetMapping("/me")
    public UserResponse me(Authentication authentication) {

        if (authentication == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }

        User user = (User) authentication.getPrincipal();

        return new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getRole().name()
        );
    }

}
