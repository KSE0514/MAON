package com.easter.route.domain.record.controller;

import java.util.List;

import com.easter.route.domain.record.entity.Record;
import com.easter.route.domain.record.entity.dto.RecordDto;
import com.easter.route.domain.record.service.RecordService;
import com.easter.route.domain.record.entity.dto.CreateRunningDto;
import com.easter.route.global.response.ResultResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/maon/route")
@Slf4j
public class RecordController {

    private final RecordService recordService;

    //TODO: routeType 구분하기?
    @PostMapping("/running/createRunning")
    public ResponseEntity<ResultResponse> createRunning(@RequestBody CreateRunningDto createRunningDto) {
        Record record = recordService.createRunning(createRunningDto);
        log.info("Record created: {}", record);
        ResultResponse resultResponse = ResultResponse.of(HttpStatus.CREATED, "Record를 생성했습니다.", record.getId());
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    @GetMapping("/record/{memberId}")
    public ResponseEntity<ResultResponse> getMyRecords(@PathVariable String memberId) {
        List<RecordDto> recordList = recordService.getRecordListByMemberId(memberId);
        ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "Record 리스트를 가져왔습니다.", recordList);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }
}
