package com.easter.route.domain.record.entity.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.geo.Point;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LocationDto {
	private String memberId;
	private String recordId;
	private String latitude;
	private String longitude;
	private double runningDistance;
	private int heartRate;
	private String pace;
	private String time;

	public Point getPoint() {
		return new Point(Double.parseDouble(longitude), Double.parseDouble(latitude));
	}
}
