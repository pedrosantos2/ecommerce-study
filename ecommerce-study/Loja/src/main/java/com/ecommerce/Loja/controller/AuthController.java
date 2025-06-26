package com.ecommerce.Loja.controller;

import java.net.URI;

import org.springframework.http.*;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.ecommerce.Loja.DTO.AuthRequest;
import com.ecommerce.Loja.DTO.AuthResponse;
import com.ecommerce.Loja.DTO.RegisterRequest;
import com.ecommerce.Loja.auth.JwtUtil;
import com.ecommerce.Loja.entidades.User;
import com.ecommerce.Loja.repository.UserRepository;
import com.ecommerce.Loja.service.CustomUserDetailsService;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthenticationManager    authManager;
    private final JwtUtil                  jwtUtil;
    private final CustomUserDetailsService uds;
    private final UserRepository           userRepo;
    private final PasswordEncoder          passwordEncoder;

    public AuthController(AuthenticationManager authManager,
                          JwtUtil jwtUtil,
                          CustomUserDetailsService uds,
                          UserRepository userRepo,
                          PasswordEncoder passwordEncoder) {
        this.authManager     = authManager;
        this.jwtUtil         = jwtUtil;
        this.uds             = uds;
        this.userRepo        = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest req) {
        authManager.authenticate(
          new UsernamePasswordAuthenticationToken(req.getUsername(), req.getPassword())
        );
        UserDetails user = uds.loadUserByUsername(req.getUsername());
        String jwt = jwtUtil.generateToken(user);
        return ResponseEntity.ok(new AuthResponse(jwt));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        // checa duplicação
        if (userRepo.findByUsername(req.getUsername()).isPresent()) {
            return ResponseEntity
                  .status(HttpStatus.CONFLICT)
                  .body("Username já cadastrado");
        }
        if (userRepo.findByEmail(req.getEmail()).isPresent()) {
            return ResponseEntity
                  .status(HttpStatus.CONFLICT)
                  .body("Email já cadastrado");
        }

        // cria e salva
        User u = new User();
        u.setUsername(req.getUsername());
        u.setEmail(req.getEmail());
        u.setPassword(passwordEncoder.encode(req.getPassword()));
        User saved = userRepo.save(u);

        // retorna 201 Created
        URI location = URI.create("/auth/users/" + saved.getId());
        return ResponseEntity.created(location).build();
    }
}
