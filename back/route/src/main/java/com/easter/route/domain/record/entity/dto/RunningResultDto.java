package com.easter.route.domain.record.entity.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RunningResultDto {
    private String startPoint;
    private RecordDto record;
    private String status;
    private Double routeDistance;
}
