package com.example.backend.config;

import com.example.backend.security.CustomUserDetailService;
import com.example.backend.security.JwtAuthFilter;
import com.example.backend.security.JwtAuthenticationEntryPoint;
import com.example.backend.security.JwtUtil;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
public class SecurityConfig {

    @Bean
    public JwtAuthFilter jwtAuthFilter(
            JwtUtil jwtUtil,
            CustomUserDetailService userDetailsService
    ) {
        return new JwtAuthFilter(jwtUtil, userDetailsService);
    }


    @Bean
    public SecurityFilterChain filterChain(
            HttpSecurity http,
            JwtAuthFilter jwtAuthFilter,
            JwtAuthenticationEntryPoint entryPoint
    ) throws Exception {

        http
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .sessionManagement(sm ->
                        sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .exceptionHandling(ex ->
                        ex.authenticationEntryPoint(entryPoint)
                )
                .authorizeHttpRequests(auth -> auth

                        // Public APIs
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/drinks/**").permitAll()

                        // Admin APIs (both ADMIN and MANAGER allowed)
                        .requestMatchers("/api/admin/**")
                        .hasAnyRole("ADMIN", "MANAGER")

                        // Everything else requires authentication
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}

