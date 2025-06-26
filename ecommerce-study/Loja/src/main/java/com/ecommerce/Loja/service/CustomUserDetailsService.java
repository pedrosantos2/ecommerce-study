package com.ecommerce.Loja.service;

import com.ecommerce.Loja.entidades.User;              // sua entidade
import com.ecommerce.Loja.repository.UserRepository;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepo;

    public CustomUserDetailsService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {

        
        User appUser = userRepo.findByUsername(username)
            .orElseThrow(() -> 
                new UsernameNotFoundException("Usuário não encontrado"));

        
        return org.springframework.security.core.userdetails.User.builder()
                .username(appUser.getUsername())
                .password(appUser.getPassword())
                .authorities(List.of(new SimpleGrantedAuthority("USER")))
                .build();
    }
}
