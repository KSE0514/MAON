package com.easter.route.domain.route.controller;

import java.util.UUID;

import com.easter.route.domain.route.entity.dto.CreateRouteRequestDto;
import com.easter.route.domain.route.entity.dto.CreateRouteResponseDto;
import com.easter.route.domain.route.entity.dto.CreateRunningDto;
import com.easter.route.domain.route.entity.dto.DeleteRouteRequestDto;
import com.easter.route.domain.route.entity.dto.LocationDto;
import com.easter.route.domain.route.service.LocationProducer;
import com.easter.route.domain.route.service.RouteService;
import com.easter.route.global.response.ResultResponse;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/route")
@RequiredArgsConstructor
public class RouteController {
    private final RouteService routeService;
    private final LocationProducer locationProducer;

    @PostMapping("/createRunning")
    public ResponseEntity<ResultResponse> createRunning(@RequestBody CreateRunningDto createRunningDto) {
        UUID runningID = routeService.createRunning(createRunningDto);
        ResultResponse resultResponse = ResultResponse.of(HttpStatus.CREATED, "Running Id를 생성했습니다.", runningID);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }


    @PostMapping("/course/create")
    public ResponseEntity<ResultResponse> createRoute(@RequestBody CreateRouteRequestDto createRouteRequestDto) {
        CreateRouteResponseDto course = routeService.createRoute(createRouteRequestDto);
        ResultResponse resultResponse = ResultResponse.of(HttpStatus.CREATED, "경로 등록을 완료했습니다.", course);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    @DeleteMapping("/course/delete")
    public ResponseEntity<ResultResponse> deleteRoute(@RequestBody DeleteRouteRequestDto deleteRouteRequestDto) {
        routeService.deleteRoute(deleteRouteRequestDto);
        ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "저장된 경로를 삭제했습니다.");
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }
}
