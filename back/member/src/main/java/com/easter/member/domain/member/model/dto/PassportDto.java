package com.easter.member.domain.member.model.dto;

import com.easter.member.global.security.userinfo.Role;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
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
    private Role role;
}
