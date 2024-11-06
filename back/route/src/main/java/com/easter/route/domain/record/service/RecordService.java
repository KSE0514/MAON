package com.easter.route.domain.record.service;

import java.util.List;

import com.easter.route.domain.record.entity.Record;
import com.easter.route.domain.record.entity.dto.RecordDto;
import com.easter.route.domain.record.entity.dto.UpdateRecordDto;
import com.easter.route.domain.route.entity.dto.CreateRunningDto;

public interface RecordService {
    Record createRunning(CreateRunningDto createRunningDto);
    void updateRecord(UpdateRecordDto updateRecordDto);
    List<RecordDto> getRecordListByMemberId(String memberId);
}
