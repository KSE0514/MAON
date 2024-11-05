package com.easter.route.domain.route.entity.dto;

import lombok.Data;

@Data
public class LocationDto {
	private String userId;
	private Double latitude;
	private Double longitude;
	private int heartRate;
	private String pace;
	private String timestamp;
}
