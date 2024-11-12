package com.easter.member.domain.member.controller;

import com.easter.member.domain.member.model.dto.*;
import com.easter.member.domain.service.model.dto.ConfirmMemberResponseDto;
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
        log.info(passport.toString());
        return "member - test";
    }

    @GetMapping("/logindone")
    public String loginDone(@RequestParam("token") String accessToken) {
        return "login succeed : " + accessToken;
    }
    
    /* 테스트 메서드 종료  */

    @PostMapping("/login")
    public ResponseEntity<ResultResponse> login(@RequestBody LoginRequestDto dto) {
        log.info("login via id_token");
        LoginResponseDto responseDto = memberService.login(dto);
        ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "로그인 처리를 완료했습니다.", responseDto);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    @PostMapping("/info")
    public ResponseEntity<ResultResponse> register(@RequestAttribute("passport") PassportDto passport, @RequestBody RegisterMemberRequestDto requestDto) {
        log.info("register new member info");
        RegisterMemberResponseDto responseDto = memberService.registerMember(passport, requestDto);
        ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "회원 가입을 완료했습니다.", responseDto);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    @PatchMapping("/info")
    public ResponseEntity<ResultResponse> modify(@RequestAttribute("passport") PassportDto passport, @RequestBody Object o) {
        log.info("modify member info");
        return null; // todo : 회원정보 수정 제작
    }
    
    @PostMapping("/reissue")
    public ResponseEntity<ResultResponse> reissue(@RequestBody ReissueTokenRequestDto requestDto) {
        log.info("reissue member info");
        ReissueTokenResponseDto responseDto = memberService.reissueToken(requestDto);
        ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "액세스 토큰을 재발급했습니다.", responseDto);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    @GetMapping("/logout")
    public ResponseEntity<ResultResponse> logout(@RequestAttribute("passport") PassportDto passport) {
        memberService.logout(passport.getEmail());
        ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "로그아웃했습니다.");
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

}
