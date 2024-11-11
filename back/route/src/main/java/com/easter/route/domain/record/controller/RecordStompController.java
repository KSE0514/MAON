package com.easter.route.domain.record.controller;

import com.easter.route.domain.record.entity.Record;
import com.easter.route.domain.record.entity.dto.LocationDto;
import com.easter.route.domain.record.entity.dto.RecordDto;
import com.easter.route.domain.record.entity.dto.RunningResultDto;
import com.easter.route.domain.record.service.RunningInfoConsumer;
import com.easter.route.domain.record.service.RunningInfoProducer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
@Slf4j
public class RecordStompController {
    private final RunningInfoProducer runningInfoProducer;
    private final RunningInfoConsumer runningInfoConsumer;

    @MessageMapping("/running/{recordId}")
    // @SendTo("/sub/running/{recordId}")
    public void sendLocation(@DestinationVariable String recordId, LocationDto locationDto) {
        log.info("Received location data: {}", recordId);
        log.info("Received location data: {}", locationDto);
        runningInfoProducer.sendLocation(locationDto);
    }

    @MessageMapping("/running/{recordId}/end")
    @SendTo("/sub/running/{recordId}/end")
    public RunningResultDto finish(@DestinationVariable String recordId) {
        log.info("End record: {}", recordId);
        return runningInfoConsumer.finish(recordId);
    }
}
