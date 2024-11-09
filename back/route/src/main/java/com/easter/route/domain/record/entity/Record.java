package com.easter.route.domain.record.entity;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.geo.GeoJsonLineString;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.easter.route.domain.record.entity.dto.LocationDto;
import com.easter.route.domain.record.entity.dto.RunningInfo;
import com.easter.route.domain.record.entity.enums.RecordType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "record")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class Record {
	@Id
	private String id;

	@Field("route_id")
	private String routeId;

	@Field("completed")
	private boolean completed;

	@Field("running_info")
	private List<RunningInfo> runningInfo;

	@Field("recorded_track")
	private GeoJsonLineString recordedTrack;

	@Field("running_time")
	private String runningTime;

	@Field("average_pace")
	private String averagePace;

	@Field("heart_rate")
	private int heartRate;

	@Field("record_type")
	private RecordType recordType;

	@CreatedDate
	private LocalDateTime createdAt;
}
