package com.easter.route.domain.marathonRoute.domain.entity;

import java.util.HashMap;

import org.springframework.data.mongodb.core.geo.GeoJsonMultiPoint;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.easter.route.domain.route.entity.Route;
import com.easter.route.domain.route.entity.enums.SpecialPointType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "marathon_route")
public class MarathonRoute extends Route {

	@Field("special_point")
	private HashMap<SpecialPointType, GeoJsonMultiPoint> specialPoint = new HashMap<>();
}
