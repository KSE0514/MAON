package com.easter.tournament.domain.participant.controller;

import com.easter.tournament.domain.participant.entity.Participant;
import com.easter.tournament.global.response.ResultResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/maon/tournament/participant")
public class ParticipantController {

    /**
     * 마라톤 신청
     * @param participant
     */
    @PostMapping("/join")
    public ResponseEntity<?> join(Participant participant) {

        ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "");
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }
}
