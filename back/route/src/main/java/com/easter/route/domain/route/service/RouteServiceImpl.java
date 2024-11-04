package com.easter.route.domain.route.service;

import org.springframework.stereotype.Service;

import com.easter.route.domain.route.entity.dto.CreateRouteRequestDto;
import com.easter.route.domain.route.entity.dto.CreateRouteResponseDto;
import com.easter.route.domain.route.entity.dto.DeleteRouteRequestDto;

@Service
public class RouteServiceImpl implements RouteService{
	@Override
	public CreateRouteResponseDto createRoute(CreateRouteRequestDto createRouteRequestDto) {
		return null;
	}

	@Override
	public void deleteRoute(DeleteRouteRequestDto deleteRouteRequestDto) {

	}
}
