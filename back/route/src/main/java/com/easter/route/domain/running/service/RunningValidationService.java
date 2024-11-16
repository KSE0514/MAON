package com.easter.route.domain.running.service;

import com.easter.route.domain.running.entity.dto.LocationDto;

public interface RunningValidationService {
	boolean validateOnRoute(LocationDto locationDto);
	boolean validateIsEndPoint(LocationDto locationDto);
	boolean makeRouteValidationResult(LocationDto locationDto);
}
