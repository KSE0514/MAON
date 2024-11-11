package com.easter.route.domain.record.entity.dto;

import lombok.Data;

@Data
public class CreateRunningDto {
	private String routeId;
	private String memberId;
	private String recordType;
}
