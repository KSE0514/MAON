package com.easter.route.domain.route.service;

import java.util.List;
import java.util.UUID;

import com.easter.route.domain.route.entity.dto.CreateRouteRequestDto;
import com.easter.route.domain.route.entity.dto.DeleteRouteRequestDto;
import com.easter.route.domain.route.entity.dto.RouteDto;
import com.easter.route.global.security.PassportDto;

public interface RouteService {
    void createRoute(PassportDto passport, CreateRouteRequestDto createRouteRequestDto);
    void deleteRoute(DeleteRouteRequestDto deleteRouteRequestDto);
    List<RouteDto> getRouteList();
}
