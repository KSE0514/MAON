package com.easter.route.domain.record.controller;

import com.easter.route.domain.record.service.RecordService;
import com.easter.route.domain.record.entity.LocationDto;
import com.easter.route.domain.record.service.LocationProducer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Controller
@MessageMapping("/topic")
@RequiredArgsConstructor
@Slf4j
public class RecordStompController {
    private final RecordService recordService;
    private final LocationProducer locationProducer;

    @MessageMapping("/running/{recordId}")
    public void sendLocation(@DestinationVariable String recordId, LocationDto locationDto) {
        log.info("Received location data: {}", recordId);
        locationProducer.send(locationDto);
    }
}
