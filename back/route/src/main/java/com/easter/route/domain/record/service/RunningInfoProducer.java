package com.easter.route.domain.record.service;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.easter.route.domain.record.entity.dto.RunningInfo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class RunningInfoProducer {
	private final KafkaTemplate<String, RunningInfo> kafkaTemplate;

    public void sendLocation(RunningInfo runningInfo) {
        String topic = "maon.route.location";
        log.info("Sending location data to topic: {}, key: {}, data: {}", topic, runningInfo.getRecordId(), runningInfo);
		this.kafkaTemplate.send(topic, runningInfo.getRecordId(), runningInfo);
	}


}
