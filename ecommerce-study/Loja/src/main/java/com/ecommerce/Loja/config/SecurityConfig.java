package com.ecommerce.Loja.config;

import com.ecommerce.Loja.auth.JwtAuthenticationFilter;
import com.ecommerce.Loja.service.CustomUserDetailsService;
import org.springframework.context.annotation.*;
import org.springframework.security.authentication.*;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.*;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private final JwtAuthenticationFilter jwtFilter;
    private final CustomUserDetailsService uds;

    public SecurityConfig(JwtAuthenticationFilter jwtFilter,
                          CustomUserDetailsService uds) {
        this.jwtFilter = jwtFilter;
        this.uds = uds;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
          .csrf().disable()
          .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
          .and()
          .authorizeHttpRequests()
            .requestMatchers("/auth/login", "/auth/register", "/home/**").permitAll()
            .anyRequest().authenticated()
          .and()
          .authenticationManager(authenticationManager(http))
          .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
          .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        return http.getSharedObject(AuthenticationManagerBuilder.class)
                   .userDetailsService(uds)
                   .passwordEncoder(passwordEncoder())
                   .and()
                   .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
