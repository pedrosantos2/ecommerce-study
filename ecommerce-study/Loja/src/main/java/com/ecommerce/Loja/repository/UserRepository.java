package com.ecommerce.Loja.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ecommerce.Loja.entidades.User;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
}