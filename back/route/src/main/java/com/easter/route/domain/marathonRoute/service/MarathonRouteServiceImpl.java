package com.easter.route.domain.marathonRoute.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.easter.route.domain.marathonRoute.domain.dto.CreateMarathonCourseRequestDto;
import com.easter.route.domain.marathonRoute.domain.dto.DeleteMarathonCourseRequestDto;
import com.easter.route.domain.marathonRoute.domain.dto.MarathonRouteDto;
import com.easter.route.global.security.PassportDto;

@Service
public class MarathonRouteServiceImpl implements MarathonRouteService {

	@Override
	public MarathonRouteDto createMarathonCourse(CreateMarathonCourseRequestDto requestDto) {
		return null;
	}

	@Override
	public void deleteMarathonCourse(PassportDto passport, DeleteMarathonCourseRequestDto requestDto) {

	}

	@Override
	public MarathonRouteDto getMarathonCourseById(String marathonRouteId) {
		return null;
	}

	@Override
	public List<MarathonRouteDto> getMarathonCourseList() {
		return null;
	}
}
