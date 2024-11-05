package com.easter.route.domain.route.entity.dto;

import lombok.Data;

@Data
public class CreateRunningDto {
	private String routeId;
	private String memberId;
	// 대회인지, 연습으로 뛰는건지 구분 용도
	private String routeType;
}
