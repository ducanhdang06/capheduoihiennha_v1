package com.example.backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {

    private static final String SECRET =
            "change-this-secret-to-env-var-32chars-min";

    private static final long EXPIRATION_MS = 15 * 60 * 1000;

    public String generateToken(UserDetails user) {

        SecretKey key = Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));
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
                        new Date(System.currentTimeMillis() + EXPIRATION_MS)
                )
                .signWith(key)
                .compact();
    }

    public Claims parseToken(String token) {
        SecretKey key = Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));

        return Jwts.parser()
                .verifyWith(key)  // Use verifyWith instead of setSigningKey
                .build()
                .parseSignedClaims(token)  // Use parseSignedClaims instead of parseClaimsJws
                .getPayload();  // Use getPayload instead of getBody
    }
}

