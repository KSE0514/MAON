package com.easter.route.domain.connection.controller;

import com.easter.route.domain.connection.model.dto.MemberInfoDto;
import com.easter.route.domain.connection.service.ConnectionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
@Slf4j
public class ConnectionStompController {

    private final ConnectionService connectionService;

    @MessageMapping("/connection/info/{code}")
    public void connectToMember(@DestinationVariable String code, MemberInfoDto dto) {
        log.info("connecting to {}", dto.getMemberId());
        connectionService.saveMemberInfo(dto, code);
    }

}
