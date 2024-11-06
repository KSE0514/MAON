package com.easter.route.domain.route.service;

import java.util.List;
import java.util.UUID;

import com.easter.route.domain.record.entity.Record;
import com.easter.route.domain.route.entity.Route;
import com.easter.route.domain.route.entity.dto.*;
import com.easter.route.domain.route.entity.enums.RouteType;
import com.easter.route.domain.route.repository.RouteRepository;
import com.easter.route.global.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import static org.springframework.data.mongodb.core.aggregation.MergeOperation.UniqueMergeId.id;

@Service
@RequiredArgsConstructor
@Slf4j
public class RouteServiceImpl implements RouteService {
	private final RouteRepository routeRepository;
	@Override
	public CreateRouteResponseDto createRoute(CreateRouteRequestDto createRouteRequestDto) {
		return null;
	}

	@Override
	// TODO: Route 삭제 요청이 올바른 사람인지 체크하는 로직이 필요.
	public void deleteRoute(DeleteRouteRequestDto deleteRouteRequestDto) {
		Route findRoute = routeRepository.findById(deleteRouteRequestDto.getRouteId())
				.orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "경로를 찾을 수 없습니다."));
		routeRepository.deleteById(findRoute.getId());
	}

	@Override
	public List<RouteDto> getRouteList() {
		List<Route> routeList = routeRepository.findAll();
		return routeList.stream().map(RouteDto::of).toList();
	}
}
