package com.easter.member.domain.member.service;

import com.easter.member.domain.member.model.dto.ConfirmMemberResponseDto;

public interface MemberService {
    ConfirmMemberResponseDto confirmMember(String email);
}
