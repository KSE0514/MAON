package com.easter.route.domain.running.controller;

import com.easter.route.domain.record.entity.dto.PointPair;
import com.easter.route.domain.running.entity.dto.LocationDto;
import com.easter.route.domain.running.entity.dto.RunningResultDto;
import com.easter.route.domain.running.service.RunningConsumer;
import com.easter.route.domain.running.service.RunningProducer;
import com.easter.route.global.utils.DistanceCalculator;

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
public class RunningStompController {
    private final RunningProducer runningProducer;
    private final RunningConsumer runningConsumer;
    private final SimpMessageSendingOperations messagingTemplate;

    // 시작점 판정
    @MessageMapping("/running/{memberId}/find-start-point")
    @SendTo("/sub/running/{memberId}/find-start-point")
    public boolean findStartPoint(@DestinationVariable String memberId, PointPair pointPair) {
        log.info("Received memberId: {}, start point request: {}",memberId ,pointPair);
        return DistanceCalculator.isWithinDistance(
            pointPair.getStartLatitude(),
            pointPair.getStartLongitude(),
            pointPair.getEndLatitude(),
            pointPair.getEndLongitude(),
            10);
    }

    // 경로 이탈 판정
    @MessageMapping("/running/{recordId}/off-course")
    @SendTo("/sub/running/{recordId}/off-course")
    public boolean checkPoint(@DestinationVariable String recordId, LocationDto locationDto) {
        log.info("Received recordId: {}, check point request: {}", recordId, locationDto);
        return runningConsumer.checkPoint(recordId, locationDto);
    }

    @MessageMapping("/running/{recordId}")
    @SendTo("/sub/running/{recordId}")
    public void sendLocation(@DestinationVariable String recordId, LocationDto locationDto) {
        log.info("Received location data: {}", recordId);
        log.info("Received location data: {}", locationDto);
        runningProducer.sendLocation(locationDto);
    }

    @MessageMapping("/running/{recordId}/end")
    @SendTo("/sub/running/{recordId}/end")
    public RunningResultDto finish(@DestinationVariable String recordId) {
        log.info("End record request received: {}", recordId);
        try {
            RunningResultDto result = runningConsumer.finish(recordId);
            log.info("Successfully processed end record: {}, result: {}", recordId, result);
            return result;
        } catch (Exception e) {
            log.error("Error processing end record: {}", recordId, e);
            messagingTemplate.convertAndSend(
                "/sub/running/" + recordId + "/error",
                "Error processing end record: " + e.getMessage());
            throw e;
        }
    }
}
