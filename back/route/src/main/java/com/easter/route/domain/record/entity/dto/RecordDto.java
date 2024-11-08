package com.easter.route.domain.record.entity.dto;

import java.time.LocalDateTime;

import org.springframework.data.mongodb.core.geo.GeoJsonLineString;

import com.easter.route.domain.record.entity.Record;
import com.easter.route.domain.record.entity.enums.RecordType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RecordDto {
	private String id;
	private String raceId;
	private RecordType recordType;
	private boolean completed;
	private String runningTime;
	private String averagePace;
	private int heartRate;
	private GeoJsonLineString recordedTrack;
	private String routeId;
	private LocalDateTime createdAt;

	public static RecordDto of(Record record) {
		return RecordDto.builder()
			.id(record.getId())
			.recordType(record.getRecordType())
			.completed(record.isCompleted())
			.runningTime(record.getRunningTime())
			.averagePace(record.getAveragePace())
			.heartRate(record.getHeartRate())
			.recordedTrack(record.getRecordedTrack())
			.routeId(record.getRouteId())
			.createdAt(record.getCreatedAt())
			.build();
	}
}
