package com.easter.route.domain.route.controller;

import com.easter.route.domain.route.entity.dto.CreateRouteRequestDto;
import com.easter.route.domain.route.entity.dto.CreateRouteResponseDto;
import com.easter.route.domain.route.entity.dto.ShareRouteRequestDto;
import com.easter.route.domain.route.entity.dto.ShareRouteResponseDto;
import com.easter.route.domain.route.service.RouteService;
import com.easter.route.global.response.ResultResponse;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/route")
@RequiredArgsConstructor
public class RouteController {
    private final RouteService routeService;

    @PostMapping("/course/create")
    public ResponseEntity<ResultResponse> createRoute(@RequestBody CreateRouteRequestDto createRouteRequestDto) {
        CreateRouteResponseDto course = routeService.createRoute(createRouteRequestDto);
        ResultResponse resultResponse = ResultResponse.of(HttpStatus.CREATED, "경로 등록을 완료했습니다.", course);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    // 경로 공개 여부 수정
    @PostMapping("/course/share")
    public ResponseEntity<ResultResponse> shareRoute(@RequestBody ShareRouteRequestDto shareRouteRequestDto) {
        ShareRouteResponseDto route = routeService.shareRoute(shareRouteRequestDto);
        ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "경로 공개 여부를 수정했습니다.", course);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }
}
