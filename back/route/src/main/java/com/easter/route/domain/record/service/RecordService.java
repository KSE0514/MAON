package com.easter.route.domain.record.service;

import com.easter.route.domain.record.entity.Record;
import com.easter.route.domain.record.entity.UpdateRecordDto;
import com.easter.route.domain.route.entity.dto.CreateRunningDto;

public interface RecordService {
    Record createRunning(CreateRunningDto createRunningDto);
    void updateRecord(UpdateRecordDto updateRecordDto);
}
