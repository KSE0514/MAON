package com.easter.member.domain.member.service;

import com.easter.member.domain.member.model.dto.ConfirmMemberResponseDto;
import com.easter.member.domain.member.model.dto.RegisterMemberRequestDto;
import com.easter.member.domain.member.model.dto.RegisterMemberResponseDto;
import com.easter.member.global.security.userinfo.PassportDto;

public interface MemberService {
    ConfirmMemberResponseDto confirmMember(String email);
    RegisterMemberResponseDto registerMember(PassportDto passport, RegisterMemberRequestDto dto);
}
