package com.easter.route.global.utils;

import org.springframework.stereotype.Component;

import com.easter.route.domain.record.service.RecordService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class OffCourseCalculator {
	private final RecordService recordService;

	private boolean isOffCourse() {
		return false;
	}
}
