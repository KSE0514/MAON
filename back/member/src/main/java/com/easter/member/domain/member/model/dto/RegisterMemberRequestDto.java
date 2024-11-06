package com.easter.member.domain.member.model.dto;

import com.easter.member.domain.member.model.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@NoArgsConstructor
public class RegisterMemberRequestDto {
    private String name;
    private String nickname;
    private String email;
    private Integer height;
    private Integer weight;
    private String birthDate;
    private String address;
    private Gender gender;
    private String imageUrl;
    private String phoneNumber;
}
