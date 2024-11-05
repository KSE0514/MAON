package com.easter.route.domain.record.service;

import com.easter.route.domain.record.entity.Record;
import com.easter.route.domain.record.entity.UpdateRecordDto;
import com.easter.route.domain.record.repository.RecordRepository;
import com.easter.route.domain.route.entity.dto.CreateRunningDto;
import com.easter.route.domain.route.entity.enums.RouteType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RecordServiceImpl implements RecordService {

    private final RecordRepository recordRepository;

    @Override
    public Record createRunning(CreateRunningDto createRunningDto) {
        Record record = Record.builder()
                .raceId(createRunningDto.getRouteId())
                .routeType(RouteType.valueOf(createRunningDto.getRouteType()))
                .completed(false)
                .totalTime(0)
                .averagePace(0.0)
                .routeId(createRunningDto.getRouteId())
                .build();
        return recordRepository.save(record);
    }

    @Override
    public void updateRecord(UpdateRecordDto updateRecordDto) {

    }
}
