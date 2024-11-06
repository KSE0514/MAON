package com.easter.member.domain.service.service;

import com.easter.member.domain.service.model.dto.ConfirmMemberResponseDto;

public interface ServiceService {
    ConfirmMemberResponseDto confirmMember(String email, String Token);
}
