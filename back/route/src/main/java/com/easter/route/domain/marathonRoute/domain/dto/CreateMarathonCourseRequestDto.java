package com.easter.route.domain.marathonRoute.domain.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateMarathonCourseRequestDto {
	private MultipartFile gpxFile;
	private String routeName;
}
