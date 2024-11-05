package com.easter.route.domain.route.service;

import java.util.UUID;

import com.easter.route.domain.route.entity.dto.CreateRouteRequestDto;
import com.easter.route.domain.route.entity.dto.CreateRouteResponseDto;
import com.easter.route.domain.route.entity.dto.CreateRunningDto;
import com.easter.route.domain.route.entity.dto.DeleteRouteRequestDto;

public interface RouteService {
    CreateRouteResponseDto createRoute(CreateRouteRequestDto createRouteRequestDto);
    void deleteRoute(DeleteRouteRequestDto deleteRouteRequestDto);
    UUID createRunning(CreateRunningDto createRunningDto);
}
