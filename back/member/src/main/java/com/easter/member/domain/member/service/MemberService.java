package com.easter.member.domain.member.service;

import com.easter.member.domain.member.model.dto.LoginResponseDto;
import com.easter.member.domain.member.model.dto.RegisterMemberRequestDto;
import com.easter.member.domain.member.model.dto.RegisterMemberResponseDto;
import com.easter.member.global.security.userinfo.PassportDto;

public interface MemberService {
    LoginResponseDto login(String token);
    RegisterMemberResponseDto registerMember(PassportDto passport, RegisterMemberRequestDto dto);
    void logout(String email);
}
