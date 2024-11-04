package com.easter.route.domain.route.service;

import com.easter.route.domain.route.entity.dto.CreateRouteRequestDto;
import com.easter.route.domain.route.entity.dto.CreateRouteResponseDto;
import com.easter.route.domain.route.entity.dto.DeleteRouteRequestDto;

public interface RouteService {
    CreateRouteResponseDto createRoute(CreateRouteRequestDto createRouteRequestDto);
    void deleteRoute(DeleteRouteRequestDto deleteRouteRequestDto);
}
