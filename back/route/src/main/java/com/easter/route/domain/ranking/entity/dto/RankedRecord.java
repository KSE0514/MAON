package com.easter.route.domain.ranking.entity.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RankedRecord {
    private String memberId;
    private String memberProfileUrl;
    private String memberName;
    private String memberNickname;
    private Double runningTime;
}
