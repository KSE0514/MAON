package com.easter.route.domain.record.entity.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LocationDto {
	private String memberId;
	private String recordId;
	private String latitude;
	private String longitude;
	private int heartRate;
	private String pace;
	private String time;
}
