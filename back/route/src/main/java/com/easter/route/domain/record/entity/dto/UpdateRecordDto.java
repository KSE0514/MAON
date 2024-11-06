package com.easter.route.domain.record.entity.dto;

import lombok.Data;

@Data
public class UpdateRecordDto {
    private String recordId;
    private String memberId;
    private String routeId;
    private String recordType;
    private String recordTime;
}
