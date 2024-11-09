package com.easter.member.domain.member.service;

import com.easter.member.domain.member.model.dto.*;
import com.easter.member.global.security.userinfo.PassportDto;

public interface MemberService {
    LoginResponseDto login(String token);
    RegisterMemberResponseDto registerMember(PassportDto passport, RegisterMemberRequestDto dto);
    ReissueTokenResponseDto reissueToken(ReissueTokenRequestDto dto);
    void logout(String email);
}
