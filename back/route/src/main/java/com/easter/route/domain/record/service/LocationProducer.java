package com.easter.route.domain.record.service;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.easter.route.domain.record.entity.LocationDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class LocationProducer {
	private final KafkaTemplate<String, LocationDto> kafkaTemplate;

    public void sendLocation(String recordId, LocationDto locationDto) {
		String key = recordId;
        String topic = "maon.route.location";
        log.info("Sending location data to topic: {}, key: {}, data: {}", topic, key, locationDto);
		this.kafkaTemplate.send(topic, key, locationDto);
	}


}
