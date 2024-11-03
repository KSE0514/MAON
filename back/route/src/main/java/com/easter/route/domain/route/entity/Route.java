package com.easter.route.domain.route.entity;

import com.easter.route.domain.route.entity.enums.RouteType;
import com.easter.route.domain.route.entity.enums.SpecialPointType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.geo.GeoJsonLineString;
import org.springframework.data.mongodb.core.geo.GeoJsonMultiPoint;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.HashMap;

@Document(collection = "route")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Route {
    @Id
    private String id;

    @Field("writer_id")
    private String writerId;

    @Field("writer_name")
    private String writerName;

    @Field("route_type")
    private RouteType routeType;

    @Field("race_id")
    private String raceId;

    @Field("start_point")
    private String startPoint;

    private Double length;

    private GeoJsonLineString track;

    @Field("special_point")
    private HashMap<SpecialPointType, GeoJsonMultiPoint> specialPoint;
}
