package com.example.backend.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// USE: helps to create/reset users, check for duplicates user name
public interface UserRepository extends JpaRepository<User, Long> {

    // used for login
    Optional<User> findByUsername(String username);

    // used to prevent duplicates
    boolean existsByUsername(String username);
}
