package com.easter.route.domain.route.entity.dto;

import lombok.Data;

@Data
public class LocationDto {
	private Double latitude;
	private Double longitude;
	private String pace;
	private String timestamp;
}
