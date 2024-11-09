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
	private RunningResultDto runningResult;
	public static Route of(CreateRouteRequestDto createRouteRequestDto) {
		return Route.builder()
			.writerId(createRouteRequestDto.getMemberId())
			.writerName(createRouteRequestDto.getMemberName())
			.routeName(createRouteRequestDto.getRouteName())
			.startPoint(createRouteRequestDto.getRunningResult().getStartPoint())
			.distance(createRouteRequestDto.getRunningResult().getRecord().getDistance())
			.track(createRouteRequestDto.getRunningResult().getRecord().getRecordedTrack())
			.createdAt(createRouteRequestDto.getRunningResult().getRecord().getCreatedAt())
			.build();
	}
}
