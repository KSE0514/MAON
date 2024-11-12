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
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
@Slf4j
public class RecordStompController {
    private final RunningInfoProducer runningInfoProducer;
    private final RunningInfoConsumer runningInfoConsumer;
    private final SimpMessageSendingOperations messagingTemplate;

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
        log.info("End record request received: {}", recordId);
        try {
            RunningResultDto result = runningInfoConsumer.finish(recordId);
            log.info("Successfully processed end record: {}, result: {}", recordId, result);
            return result;
        } catch (Exception e) {
            log.error("Error processing end record: {}", recordId, e);
            // 에러 발생 시 클라이언트에게 에러 메시지 전송
            messagingTemplate.convertAndSend(
                "/sub/running/" + recordId + "/error",
                "Error processing end record: " + e.getMessage()
            );
            throw e;
        }
        }
}
