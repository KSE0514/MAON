package com.easter.route.domain.connection.service;

import com.easter.route.domain.connection.model.dto.MemberInfoDto;

import java.util.UUID;

public interface ConnectionService {
    void saveMemberInfo(MemberInfoDto dto, String code);
}
