package com.easter.route.domain.route.service;

import com.easter.route.domain.route.entity.dto.GetMemberListRequestFeignDto;
import com.easter.route.global.response.ResultResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient("member")
public interface MemberClient {

    @PostMapping("member/service/search")
    ResponseEntity<ResultResponse> getMemberInfoList(GetMemberListRequestFeignDto requestFeignDto);
}
