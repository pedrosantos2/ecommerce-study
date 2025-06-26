package com.ecommerce.Loja.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.Loja.entidades.AccessCount;

public interface AccessCountRepository extends JpaRepository<AccessCount, Long> {}