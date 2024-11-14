package com.easter.route.domain.connection.service;

import com.easter.route.domain.connection.model.dto.ConnectionTestDto;
import com.easter.route.domain.connection.model.dto.MemberInfoDto;
import com.easter.route.domain.connection.model.dto.RelayMemberInfoDto;

import java.util.UUID;

public interface ConnectionService {
    void saveMemberInfo(MemberInfoDto dto, String code);
    ConnectionTestDto connectionTest(String code);
    RelayMemberInfoDto relayMemberInfo(String code);
}