package com.easter.route.domain.connection.controller;

import com.easter.route.domain.connection.model.dto.ConnectionTestDto;
import com.easter.route.domain.connection.model.dto.MemberInfoDto;
import com.easter.route.domain.connection.model.dto.RelayMemberInfoDto;
import com.easter.route.domain.connection.model.dto.SimpleTimestampDto;
import com.easter.route.domain.connection.service.ConnectionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
@Slf4j
public class ConnectionStompController {

    private final ConnectionService connectionService;
    private final SimpMessageSendingOperations messagingTemplate;
    private final String SUB_PATH = "/sub/connection/";

    @MessageMapping("/connection/info/{code}")
    public void connectToMember(@DestinationVariable String code, MemberInfoDto dto) {
        log.info("connecting to {} at {}", dto.getMemberId(), dto.getTimestamp());
        connectionService.saveMemberInfo(dto, code);
    }

    @MessageMapping("/connection/start/{code}")
    public void startConnectionTest(@DestinationVariable String code, SimpleTimestampDto dto) {
        log.info("start connection test at {}", dto.getTimestamp());
        ConnectionTestDto sendDto = connectionService.connectionTest(code);
        messagingTemplate.convertAndSend(SUB_PATH + code, sendDto);
    }

    @MessageMapping("/connection/success/{code}")
    public void confirmSuccess(@DestinationVariable String code, SimpleTimestampDto dto) {
        log.info("confirm success arrived {} at {}", code, dto.getTimestamp());
        RelayMemberInfoDto sendDto = connectionService.relayMemberInfo(code);
        messagingTemplate.convertAndSend(SUB_PATH + code, sendDto);
    }

}
