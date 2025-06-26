package com.ecommerce.Loja.controller;

import java.util.Collections;
import java.util.Map;

import org.springframework.web.bind.annotation.*;

import com.ecommerce.Loja.service.AccessCountService;

@RestController
@RequestMapping("/home/metrics")
public class MetricsController {
    private final AccessCountService service;

    public MetricsController(AccessCountService service) {
        this.service = service;
    }

    @GetMapping("/accessCount")
    public Map<String, Long> getAccessCount() {
        return Collections.singletonMap("count", service.getCount());
    }
}
