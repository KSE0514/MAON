package com.easter.route.domain.route.service;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class LocationDataListener {

	private final RouteService routeService;
	private final LocationProducer locationProducer;

	@KafkaListener(topics = "maon.route.location")
	public void listenLocation(String message) {
		log.info("Received location data: {}", message);
	}
}
