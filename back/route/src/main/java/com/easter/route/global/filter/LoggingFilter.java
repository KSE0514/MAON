package com.easter.route.global.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Enumeration;


@Slf4j
public class LoggingFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        log.info("get new request : {}", request.getRequestURI());
        log.info("url : {}", request.getRequestURL());
        Enumeration<String> headerNames = request.getHeaderNames();
        log.info("----headers----");
        while(headerNames.hasMoreElements()) {
            String headerName = headerNames.nextElement();

            log.info("{} : {}", headerName, request.getHeader(headerName));
        }
        filterChain.doFilter(request, response);
    }
}
