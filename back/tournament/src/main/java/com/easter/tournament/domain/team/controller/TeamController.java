package com.easter.tournament.domain.team.controller;

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
@RequestMapping("/maon/tournament/team")
public class TeamController {

    /**
     * 마라톤 참가 신청
     * @return
     */
    @PostMapping("/create")
    public ResponseEntity<?> join(){

        ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "");
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    /**
     * 마라톤 팀 요청
     * @return
     */
    @PostMapping("/teamRequest")
    public ResponseEntity<?> teamRequest(){

        ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "");
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    /**
     * 팀 요청 수락
     * @return
     */
    @PostMapping("/teamResponse")
    public ResponseEntity<?> teamResponse(){

        return null;
    }
}
