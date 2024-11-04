package com.easter.member.domain.member.controller;

import com.easter.member.domain.member.model.dto.ConfirmMemberResponseDto;
import com.easter.member.domain.member.repository.MemberRepository;
import com.easter.member.domain.member.service.MemberService;
import com.easter.member.global.response.ResultResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/maon/member/member")
public class MemberController {

    private final MemberService memberService;

    /* 테스트용 메서드들 : 추후 삭제 예정 */
    @GetMapping("/test")
    public String test(@RequestHeader Map<String, String> headers) {
        for(Map.Entry<String, String> entry : headers.entrySet()) {
            log.info(entry.getKey() + ":" + entry.getValue());
        }
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

    @GetMapping("/confirm/{email}")
    public ResponseEntity<ResultResponse> confirm(@PathVariable String email) {
        log.info("confirm email : {}", email);
        ConfirmMemberResponseDto responseDto = memberService.confirmMember(email);
        ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "멤버 정보 확인 완료", responseDto);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

}
