package com.easter.member.global.filter;

import com.easter.member.domain.member.model.dto.PassportDto;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.lang.reflect.Field;
import java.util.*;

@Slf4j
public class PassportFilter extends OncePerRequestFilter {
    private final ObjectMapper mapper;
    public PassportFilter() {
        mapper = new ObjectMapper();
        mapper.configure(MapperFeature.ACCEPT_CASE_INSENSITIVE_PROPERTIES, true);
    }
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        log.info("passport filter test");
        Enumeration<String> headerNames = request.getHeaderNames();
        Field[] passportField = PassportDto.class.getDeclaredFields();
        List<String> fieldList = new ArrayList<>();
        Map<String, String> passportMap = new HashMap<>();
        for(Field f : passportField) {
            fieldList.add(f.getName().toLowerCase());
        }
        while (headerNames.hasMoreElements()) {
            String headerName = headerNames.nextElement();
            String headerValue;
            if(fieldList.contains(headerName)) {
                headerValue = new String(Base64.getDecoder().decode(request.getHeader(headerName)), "UTF-8");
                passportMap.put(headerName, headerValue);
//                request.setAttribute(headerName, headerValue);
            }
            else headerValue = request.getHeader(headerName);
            log.debug("headerName: {}, headerValue: {}", headerName, headerValue);
        }
        PassportDto passport = mapper.convertValue(passportMap, PassportDto.class);
        request.setAttribute("passport", passport);
        filterChain.doFilter(request, response);
    }
}
