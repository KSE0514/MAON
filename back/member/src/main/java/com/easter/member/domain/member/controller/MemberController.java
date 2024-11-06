package com.easter.member.domain.member.controller;

import com.easter.member.domain.service.model.dto.ConfirmMemberResponseDto;
import com.easter.member.domain.member.model.dto.RegisterMemberRequestDto;
import com.easter.member.domain.member.model.dto.RegisterMemberResponseDto;
import com.easter.member.domain.member.service.MemberService;
import com.easter.member.global.response.ResultResponse;
import com.easter.member.global.security.userinfo.PassportDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/maon/member/member")
public class MemberController {

    private final MemberService memberService;

    /* 테스트용 메서드들 : 추후 삭제 예정 */
    @GetMapping("/test")
    public String test(@RequestAttribute("passport") PassportDto passport) throws Exception {
//        for(Map.Entry<String, String> entry : headers.entrySet()) {
//            log.info(entry.getKey() + ":" + entry.getValue());
//        }
        log.info(passport.toString());
        return "member - test";
    }

    @GetMapping("/succeed")
    public String succeed() {
        return "member - succeed";
    }

    @GetMapping("/failed")
    public String failed() {
        return "member - failed";
    }
    
    /* 테스트 메서드 종료  */

    @PostMapping("/info")
    public ResponseEntity<ResultResponse> register(@RequestAttribute("passport") PassportDto passport, @RequestBody RegisterMemberRequestDto requestDto) {
        log.info("register new member info");
        RegisterMemberResponseDto responseDto = memberService.registerMember(passport, requestDto);
        ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "회원 가입을 완료했습니다.", responseDto);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

}
