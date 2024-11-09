package com.easter.tournament.domain.tournament.controller;

import com.easter.tournament.domain.tournament.model.dto.GetMarathonRequestDto;
import com.easter.tournament.domain.tournament.model.dto.GetMarathonResponseDto;
import com.easter.tournament.domain.tournament.model.dto.SearchMyTournamentResponseDto;
import com.easter.tournament.domain.tournament.service.TournamentService;
import com.easter.tournament.domain.tournament.service.TournamentServiceImpl;
import com.easter.tournament.global.response.ResultResponse;
import com.easter.tournament.global.security.PassportDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/maon/tournament/tournament")
public class TournamentController {

    private final TournamentService tournamentService;

    /**
     * 마라톤 조회 처음
     * @return
     */
    @PostMapping("/getMarathon")
    public ResponseEntity<?> getAllMarathon(@Valid @RequestBody GetMarathonRequestDto getMarathonRequestDto) {
        List<GetMarathonResponseDto> getMarathonResponseDtos = tournamentService.getMarathon(getMarathonRequestDto);
        ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "마라톤 정보 조회 성공", getMarathonResponseDtos);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    /**
     * 타이틀로 검색
     * @param title
     * @return
     */
    @GetMapping("/getMarathonName/{title}")
    public ResponseEntity<?> getAllMarathonName(@PathVariable String title) {
        log.info("Get marathon title: {}", title);
        List<GetMarathonResponseDto> getMarathonResponseDto = tournamentService.getMarathonByTitle(title);
        ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, title + " 조회 성공", getMarathonResponseDto);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    /**
     * 마라톤 상세 조회
     * @return
     */
    @GetMapping("/getMarathon/detail/{uuid}")
    public ResponseEntity<?> getMarathonDetail(@PathVariable UUID uuid) {
        log.info("Get marathon uuid: {}", uuid);
        GetMarathonResponseDto getMarathonResponseDto = tournamentService.getMarathonDetail(uuid);
        ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, getMarathonResponseDto.getTitle() + " 조회성공", getMarathonResponseDto);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    /**
     * 자신의 마라톤 신청 리스트 조회
     * @return
     */
    @GetMapping("/my")
    public ResponseEntity<ResultResponse> myTournament(@RequestAttribute("passport") PassportDto passport) {
        log.info("search my tournament : {}", passport.getEmail());
        SearchMyTournamentResponseDto responseDto = tournamentService.searchMyTournament(passport);
        ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "참여 마라톤 정보를 조회했습니다.", responseDto);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }


}
