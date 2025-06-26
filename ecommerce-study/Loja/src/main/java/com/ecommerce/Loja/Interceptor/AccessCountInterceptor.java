package com.ecommerce.Loja.Interceptor;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.ecommerce.Loja.service.AccessCountService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class AccessCountInterceptor implements HandlerInterceptor {
    private final AccessCountService service;

    public AccessCountInterceptor(AccessCountService service) {
        this.service = service;
    }

    @Override
    public boolean preHandle(HttpServletRequest req, 
                             HttpServletResponse res, 
                             Object handler) {
        // incremente apenas em GET /home ou em tudo que quiser contar
        if ("GET".equals(req.getMethod()) && req.getRequestURI().startsWith("/home")) {
            service.increment();
        }
        return true;
    }
}
