package com.easter.member.domain.member.model.dto;

import lombok.*;

@Getter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ConfirmMemberResponseDto {
    private boolean registered;
    private PassportDto passport;
}
