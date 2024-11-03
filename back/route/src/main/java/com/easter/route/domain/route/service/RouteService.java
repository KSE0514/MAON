package com.easter.route.domain.route.service;

import com.easter.route.domain.route.entity.dto.CreateRouteRequestDto;
import com.easter.route.domain.route.entity.dto.CreateRouteResponseDto;

public interface RouteService {
    CreateRouteResponseDto createRoute(CreateRouteRequestDto createRouteRequestDto);
}
