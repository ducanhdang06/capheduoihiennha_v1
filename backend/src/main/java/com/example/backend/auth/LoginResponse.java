package com.example.backend.auth;

// USE: this is dto response from the server
public class LoginResponse {
    public String accessToken;

    public LoginResponse(String accessToken) {
        this.accessToken = accessToken;
    }
}
