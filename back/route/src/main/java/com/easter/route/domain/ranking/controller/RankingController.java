package com.easter.route.domain.ranking.controller;

import com.easter.route.domain.ranking.entity.dto.GetMyRankingDto;
import com.easter.route.domain.ranking.entity.dto.GetRankingListDto;
import com.easter.route.domain.ranking.entity.dto.RankedRecordDto;
import com.easter.route.domain.ranking.service.RankingService;
import com.easter.route.global.response.ResultResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/maon/route")
public class RankingController {

    private final RankingService rankingService;

    @GetMapping("/ranking/{routeId}")
    public ResponseEntity<ResultResponse> getAllRankingList(@PathVariable String routeId) {
        GetRankingListDto ranking = rankingService.getRankingList(routeId);
        ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "Ranking 정보: {} ", ranking);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    @GetMapping("/ranking/{routeId}/{memberId}")
    public ResponseEntity<ResultResponse> getMyRanking(@PathVariable String routeId, @PathVariable String memberId) {
        GetMyRankingDto myRanking = rankingService.getMyRanking(routeId, memberId);
        ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "My Ranking 정보: {} ", myRanking);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    // test용, 삭제 할 것
    @GetMapping("/ranking/updateAllRankingList")
    public ResponseEntity<ResultResponse> updateAllRankingList() {
        rankingService.updateAllRankingList();
        ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "모든 랭킹 정보를 업데이트했습니다.");
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }
}
