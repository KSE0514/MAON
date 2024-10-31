package com.easter.member.domain.member.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/maon/member/member")
public class MemberController {

    @GetMapping("/test")
    public String test() {
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

}
