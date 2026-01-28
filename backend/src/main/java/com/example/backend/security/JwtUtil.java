package com.example.backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {

    private final byte[] secret;
    private final long expirationMs;

    public JwtUtil(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.expiration-ms}") long expirationMs
    ) {
        this.secret = secret.getBytes(StandardCharsets.UTF_8);
        this.expirationMs = expirationMs;
    }

    public String generateToken(UserDetails user) {

        SecretKey key = Keys.hmacShaKeyFor(secret);
        return Jwts.builder()
                .subject(user.getUsername())
                .claim(
                        "role",
                        user.getAuthorities()
                                .iterator()
                                .next()
                                .getAuthority()
                )
                .issuedAt(new Date())
                .expiration(
                        new Date(System.currentTimeMillis() + expirationMs)
                )
                .signWith(key)
                .compact();
    }

    public Claims parseToken(String token) {

        return Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(secret))  // Use verifyWith instead of setSigningKey
                .build()
                .parseSignedClaims(token)  // Use parseSignedClaims instead of parseClaimsJws
                .getPayload();  // Use getPayload instead of getBody
    }
}

