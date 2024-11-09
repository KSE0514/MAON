package com.easter.tournament.domain.team.controller;

import com.easter.tournament.domain.team.model.dto.CreateTeamRequestDto;
import com.easter.tournament.domain.team.model.dto.SearchTeamMemberResponseDto;
import com.easter.tournament.domain.team.service.TeamService;
import com.easter.tournament.global.response.ResultResponse;
import com.easter.tournament.global.security.PassportDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.xml.transform.Result;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/maon/tournament/team")
public class TeamController {

    private final TeamService teamService;

    /**
     * 마라톤 팀 생성
     * @return
     */
    @PostMapping("/create")
    public ResponseEntity<ResultResponse> join(@RequestAttribute("passport") PassportDto passport, @RequestBody CreateTeamRequestDto dto){
        log.info("create team");
        teamService.createTeam(passport, dto);
        ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "팀을 생성했습니다.");
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    /**
     * 마라톤 팀 구성원 조회
     * @return
     */
    @GetMapping("/{teamId}")
    public ResponseEntity<ResultResponse> search(@PathVariable UUID teamId){
        log.info("search team members");
        SearchTeamMemberResponseDto responseDto = teamService.searchTeamMember(teamId);
        ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "팀 구성원을 조회했습니다.", responseDto);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    /**
     * 마라톤 팀 요청
     * @return
     */
    @PostMapping("/teamRequest")
    public ResponseEntity<ResultResponse> teamRequest(){

        ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "");
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    /**
     * 팀 요청 수락
     * @return
     */
    @PostMapping("/teamResponse")
    public ResponseEntity<ResultResponse> teamResponse(){

        return null;
    }
}
