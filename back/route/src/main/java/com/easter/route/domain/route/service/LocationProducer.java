package com.easter.route.domain.route.service;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.easter.route.domain.route.entity.dto.LocationDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class LocationProducer {
	private final KafkaTemplate<String, LocationDto> kafkaTemplate;
	private final String topic = "maon.route.location";

	public void send(LocationDto locationDto) {
		String key = locationDto.getUserId();
		log.info("Sending location data to topic: {}, key: {}, data: {}", topic, key, locationDto);
		this.kafkaTemplate.send(topic, key, locationDto);
	}
}
