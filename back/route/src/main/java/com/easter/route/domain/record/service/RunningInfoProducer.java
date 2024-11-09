package com.easter.route.domain.record.service;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Service;

import com.easter.route.domain.record.entity.dto.LocationDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.util.concurrent.ListenableFuture;

import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
@Slf4j
public class RunningInfoProducer {

	private final KafkaTemplate<String, LocationDto> kafkaTemplate;

    public void sendLocation(LocationDto locationDto) {
        String topic = "maon.route.location";
        kafkaTemplate.send(topic, locationDto.getRecordId(), locationDto)
                .whenComplete((result, ex) -> {
                    if (ex != null) {
                        log.error("Failed to send location data: {}", locationDto, ex);
                    } else {
                        log.info("Sending location data to topic: {}, key: {}, data: {}", topic, locationDto.getRecordId(), locationDto);
                    }
                });
    }
}
