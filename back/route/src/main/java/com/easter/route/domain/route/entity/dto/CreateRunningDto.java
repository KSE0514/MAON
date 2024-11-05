package com.easter.route.domain.route.entity.dto;

import lombok.Data;

@Data
public class CreateRunningDto {
	//경로 있이 뛰기인지, 경로 없이 뛰기인지 구분 용도
	private String runningType;
	private String routeId;
	private String userId;
}
