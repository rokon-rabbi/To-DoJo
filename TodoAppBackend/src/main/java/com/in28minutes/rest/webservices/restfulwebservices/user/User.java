package com.in28minutes.rest.webservices.restfulwebservices.user;
import jakarta.persistence.*;
import java.util.UUID;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    private String resetPasswordToken;

    private String roles; // Example: \"ROLE_USER,ROLE_ADMIN\"

    // Getters and Setters
}
