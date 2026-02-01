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


// | Rule               | Meaning         |
// | ------------------ | --------------- |
// | `STATELESS`        | No sessions     |
// | `/api/auth/**`     | Login is public |
// | `/api/drinks/**`   | Public menu     |
// | `/api/admin/**`    | ADMIN only      |
// | `.authenticated()` | JWT required    |


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
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/drinks/**").permitAll()

                        .requestMatchers(HttpMethod.POST, "/api/drinks/**")
                        .hasAnyRole("ADMIN", "MANAGER")
                        .requestMatchers(HttpMethod.PUT, "/api/drinks/**")
                        .hasAnyRole("ADMIN", "MANAGER")
                        .requestMatchers(HttpMethod.DELETE, "/api/drinks/**")
                        .hasAnyRole("ADMIN", "MANAGER")

                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}

