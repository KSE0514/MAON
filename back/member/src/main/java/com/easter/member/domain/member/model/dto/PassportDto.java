package com.easter.member.domain.member.model.dto;

import lombok.*;

import java.util.UUID;

@Getter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class PassportDto {
    private UUID id;
    private String name;
    private String nickname;
    private String email;
    private String imageUrl;
}
