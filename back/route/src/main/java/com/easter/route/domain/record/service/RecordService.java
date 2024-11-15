package com.easter.route.domain.record.service;

import java.util.List;

import com.easter.route.domain.record.entity.Record;
import com.easter.route.domain.record.entity.dto.RecordDto;
import com.easter.route.domain.record.entity.dto.UpdateRecordDto;
import com.easter.route.domain.record.entity.dto.CreateRunningDto;
import com.easter.route.global.security.PassportDto;

public interface RecordService {
    Record createRunning(PassportDto passport, CreateRunningDto createRunningDto);
    Record updateRecord(UpdateRecordDto updateRecordDto);
    List<RecordDto> getRecordListByMemberId(String memberId);
}
