package com.easter.route.domain.record.entity.dto;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.mongodb.core.geo.GeoJsonLineString;

import java.util.List;

@Data
@Builder
public class UpdateRecordDto {
    private String recordId;
    private List<LocationDto> runningInfo;
    private List<String> paceList;
    private List<Double> distanceList;
    private int averageHeartRate;
    private Double distance;
    private String averagePace;
    private GeoJsonLineString recordedTrack;
    private String runningTime;
    private Boolean completed;
}
