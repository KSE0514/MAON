package com.easter.route.domain.route.service;

import java.util.UUID;

import com.easter.route.domain.record.entity.Record;
import com.easter.route.domain.route.entity.enums.RouteType;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import com.easter.route.domain.route.entity.dto.CreateRouteRequestDto;
import com.easter.route.domain.route.entity.dto.CreateRouteResponseDto;
import com.easter.route.domain.route.entity.dto.CreateRunningDto;
import com.easter.route.domain.route.entity.dto.DeleteRouteRequestDto;

import static org.springframework.data.mongodb.core.aggregation.MergeOperation.UniqueMergeId.id;

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
