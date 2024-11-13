package com.easter.route.domain.route.entity.dto;

import com.easter.route.domain.record.entity.dto.RunningResultDto;
import com.easter.route.domain.route.entity.Route;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CreateRouteRequestDto {
	private String memberId;
	private String memberName;
	private String routeName;
	private String recordId;
}
