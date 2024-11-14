package com.easter.member.domain.challenge.controller;

import com.easter.member.domain.challenge.service.ChallengeService;
import com.easter.member.global.response.ResultResponse;
import com.easter.member.global.security.userinfo.PassportDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/maon/member/challenge")
public class ChallengeController {

    private final ChallengeService challengeService;

    @GetMapping("/init")
    public ResponseEntity<ResultResponse> initProgress(@RequestAttribute("passport")PassportDto passport) {
        log.info("init challenge progress");
        challengeService.initChallenge(passport);
        ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "챌린지를 초기화했습니다.");
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }
}
