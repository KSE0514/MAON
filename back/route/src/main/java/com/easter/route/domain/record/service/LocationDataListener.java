package com.easter.route.domain.record.service;

import com.easter.route.domain.record.entity.LocationDto;
import com.easter.route.domain.route.service.RouteService;
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

	@KafkaListener(topics = "maon.route.location", groupId = "location")
	public void listenLocation(LocationDto message) {
		log.info("Received location data: {}", message);
	}
}
