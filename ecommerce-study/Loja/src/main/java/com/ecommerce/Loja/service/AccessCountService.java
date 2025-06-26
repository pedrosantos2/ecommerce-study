package com.ecommerce.Loja.service;

import org.springframework.stereotype.Service;

import com.ecommerce.Loja.entidades.AccessCount;
import com.ecommerce.Loja.repository.AccessCountRepository;

import org.springframework.transaction.annotation.Transactional;

@Service
public class AccessCountService {
    private final AccessCountRepository repo;

    public AccessCountService(AccessCountRepository repo) {
        this.repo = repo;
    }

    @Transactional
    public Long increment() {
        AccessCount ac = repo.findById(1L)
            .orElseGet(() -> new AccessCount());
        ac.setCount(ac.getCount() + 1);
        repo.save(ac);
        return ac.getCount();
    }

    @Transactional(readOnly = true)
    public Long getCount() {
        return repo.findById(1L)
                   .map(AccessCount::getCount)
                   .orElse(0L);
    }
}
