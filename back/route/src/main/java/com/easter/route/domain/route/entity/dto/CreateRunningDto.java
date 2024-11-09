package com.easter.route.domain.route.entity.dto;

import lombok.Data;

@Data
public class CreateRunningDto {
	private String routeId;
	private String memberId;
	private String recordType;
}
