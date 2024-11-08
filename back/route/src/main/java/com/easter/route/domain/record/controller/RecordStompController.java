package com.easter.route.domain.record.controller;

import com.easter.route.domain.record.entity.dto.RunningResultDto;
import com.easter.route.domain.record.service.RecordService;
import com.easter.route.domain.record.entity.dto.RunningInfo;
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
    public void sendLocation(@DestinationVariable String recordId, RunningInfo runningInfo) {
        log.info("Received location data: {}", recordId);
        runningInfoProducer.sendLocation(runningInfo);
        // return "Server received Running Info data";
    }

    @MessageMapping("/running/{recordId}/end")
    @SendTo("/sub/running/{recordId}/end")
    public void endRecord(@DestinationVariable String recordId, RunningResultDto runningResultDto) {
        log.info("End record: {}", recordId);
    }
}
