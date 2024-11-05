package com.easter.route.domain.record.entity;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.geo.GeoJsonLineString;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.easter.route.domain.route.entity.enums.RouteType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Document(collection = "record")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class Record {
	@Id
	private String id;

	@Field("race_id")
	private String raceId;

	@Field("route_type")
	private RouteType routeType;

	@Field("completed")
	private boolean completed;

	@Field("total_time")
	private double totalTime;

	@Field("average_pace")
	private Double averagePace;

	@Field("recorded_track")
	private GeoJsonLineString recordedTrack;

	@Field("route_id")
	private String routeId;

	@CreatedDate
	private LocalDateTime createdAt;

	@LastModifiedDate
	private LocalDateTime updatedAt;
}
