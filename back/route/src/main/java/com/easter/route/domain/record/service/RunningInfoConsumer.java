package com.easter.route.domain.record.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.easter.route.domain.record.entity.dto.RunningInfo;
import com.easter.route.domain.route.service.RouteService;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class RunningInfoConsumer {

	private final HashMap<String, List<RunningInfo>> runningInfoMap = new HashMap<>();

	// Kafka recordId를 key로 메시지가 쌓이고, 그 값은 Map에 저장된다.
	@KafkaListener(topics = "maon.route.location", groupId = "running.group")
	public void listenLocation(RunningInfo runningInfo) {
		log.info("Received location data: {}", runningInfo);
		String recordId = runningInfo.getRecordId();
		runningInfoMap.computeIfAbsent(recordId, k -> new ArrayList<>()).add(runningInfo);
	}

	public List<RunningInfo> getRunningInfo(String recordId) {
		return runningInfoMap.getOrDefault(recordId, new ArrayList<>());
	}

	public void clearRunningInfo(String recordId) {
		runningInfoMap.remove(recordId);
	}
}
