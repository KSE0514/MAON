package com.easter.route.domain.record.controller;

import com.easter.route.domain.record.service.RecordService;
import com.easter.route.domain.record.entity.dto.LocationDto;
import com.easter.route.domain.record.service.LocationProducer;
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
    private final RecordService recordService;
    private final LocationProducer locationProducer;

    @MessageMapping("/handshake")
    @SendTo("/sub/handshake")
    public String handshake() {
        log.info("Handshake received");
        return "Handshake successful";
    }

    @MessageMapping("/running/{recordId}")
    @SendTo("/sub/running/{recordId}")
    public String sendLocation(@DestinationVariable String recordId, LocationDto locationDto) {
        log.info("Received location data: {}", recordId);
        locationProducer.sendLocation(recordId, locationDto);
        return "success";
    }

    // @MessageMapping("/running/{recordId}/end")
    // public void endRecord(@DestinationVariable String recordId) {
    //     log.info("End record: {}", recordId);
    //     recordService.endRecord(recordId);
    // }
}
