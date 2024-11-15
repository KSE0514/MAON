package com.easter.route.domain.route.service;

import java.time.LocalDateTime;
import java.util.List;

import com.easter.route.domain.record.entity.Record;
import com.easter.route.domain.record.repository.RecordRepository;
import com.easter.route.domain.route.entity.Route;
import com.easter.route.domain.route.entity.dto.*;
import com.easter.route.domain.route.repository.RouteRepository;
import com.easter.route.global.exception.BusinessException;
import com.easter.route.global.security.PassportDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class RouteServiceImpl implements RouteService {
	private final RouteRepository routeRepository;
	private final RecordRepository recordRepository;

	@Override
	public void createRoute(PassportDto passport, CreateRouteRequestDto createRouteRequestDto) {
		Record record = recordRepository.findById(createRouteRequestDto.getRecordId())
				.orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "레코드를 찾을 수 없습니다."));

		Route route = Route.builder()
				.writerId(passport.getId().toString())
				.writerName(passport.getNickname())
				.routeName(createRouteRequestDto.getRouteName())
				.startPoint(record.getStartPoint())
				.distance(record.getDistance())
				.track(record.getRecordedTrack())
				.createdAt(LocalDateTime.now())
				.build();

		routeRepository.save(route);
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
