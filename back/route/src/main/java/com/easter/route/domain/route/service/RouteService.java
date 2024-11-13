package com.easter.route.domain.route.service;

import java.util.List;
import java.util.UUID;

import com.easter.route.domain.route.entity.dto.CreateRouteRequestDto;
import com.easter.route.domain.route.entity.dto.DeleteRouteRequestDto;
import com.easter.route.domain.route.entity.dto.RouteDto;

public interface RouteService {
    void createRoute(CreateRouteRequestDto createRouteRequestDto);
    void deleteRoute(DeleteRouteRequestDto deleteRouteRequestDto);
    List<RouteDto> getRouteList();
}
