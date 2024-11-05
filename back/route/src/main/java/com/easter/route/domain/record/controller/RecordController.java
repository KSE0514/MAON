package com.easter.route.domain.record.controller;

import com.easter.route.domain.record.entity.Record;
import com.easter.route.domain.record.service.RecordService;
import com.easter.route.domain.route.entity.dto.CreateRunningDto;
import com.easter.route.global.response.ResultResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/route")
public class RecordController {

    private final RecordService recordService;
    @PostMapping("/running/createRunning")
    public ResponseEntity<ResultResponse> createRunning(@RequestBody CreateRunningDto createRunningDto) {
        Record record = recordService.createRunning(createRunningDto);
        ResultResponse resultResponse = ResultResponse.of(HttpStatus.CREATED, "Record를 생성했습니다.", record.getId());
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

}
