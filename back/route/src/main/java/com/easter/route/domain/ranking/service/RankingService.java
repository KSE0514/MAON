package com.easter.route.domain.ranking.service;


import com.easter.route.domain.ranking.entity.dto.GetMyRankingDto;
import com.easter.route.domain.ranking.entity.dto.GetRankingListDto;
import com.easter.route.domain.ranking.entity.dto.UpdateRankingDto;

public interface RankingService {
    GetRankingListDto getRanking(String routeId);
    GetMyRankingDto getMyRanking(String routeId, String memberId);
    void updateAllRankingLists();
    void updateRankingList(String routeId);

}
