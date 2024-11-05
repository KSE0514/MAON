package com.easter.route.domain.route.service;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class LocationDataListener {


	@KafkaListener(topics = "maon.route.location")
	public void
}
