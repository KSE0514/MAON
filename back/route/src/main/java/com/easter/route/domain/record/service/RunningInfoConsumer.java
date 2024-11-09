package com.easter.route.domain.record.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.easter.route.domain.record.entity.dto.LocationDto;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class RunningInfoConsumer {

	private final HashMap<String, List<LocationDto>> runningInfoMap = new HashMap<>();

	// Kafka recordId를 key로 메시지가 쌓이고, 그 값은 Map에 저장된다.
	@KafkaListener(topics = "maon.route.location", groupId = "running.group")
	public void listenLocation(LocationDto locationDto) {
		log.info("Received location data: {}", locationDto);
		String recordId = locationDto.getRecordId();
		runningInfoMap.computeIfAbsent(recordId, k -> new ArrayList<>()).add(locationDto);
	}

	public List<LocationDto> getRunningInfo(String recordId) {
		return runningInfoMap.getOrDefault(recordId, new ArrayList<>());
	}

	public void clearRunningInfo(String recordId) {
		runningInfoMap.remove(recordId);
	}
}
