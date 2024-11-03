package com.easter.route.domain.route.entity;

import com.easter.route.domain.route.entity.enums.SpecialPointType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.geo.GeoJsonMultiPoint;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class SpecialPoint {
    private SpecialPointType specialPointType;
    private GeoJsonMultiPoint point;
}
