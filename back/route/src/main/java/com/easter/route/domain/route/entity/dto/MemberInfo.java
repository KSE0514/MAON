package com.easter.route.domain.route.entity.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberInfo {
    private UUID memberId;
    private String name;
    private String nickname;
    private String email;
    private String imageUrl;
}
