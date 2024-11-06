package com.easter.route.domain.route.entity;

import com.easter.route.domain.route.entity.enums.RouteType;
import com.easter.route.domain.route.entity.enums.SpecialPointType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.geo.GeoJsonLineString;
import org.springframework.data.mongodb.core.geo.GeoJsonMultiPoint;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.UUID;

@Document(collection = "route")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Route {
    @Id
    private String id;

    @Field("writer_id")
    private String writerId;

    @Field("writer_name")
    private String writerName;

    @Field("route_name")
    private String routeName;

    @Field("route_type")
    private RouteType routeType;

    @Field("race_id")
    private String raceId;

    @Field("start_point")
    private String startPoint;

    private Double distance;

    private GeoJsonLineString track;

    @Field("special_point")
    private HashMap<SpecialPointType, GeoJsonMultiPoint> specialPoint = new HashMap<>();

    @Field("route_image_url")
    private String routeImageUrl;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}
