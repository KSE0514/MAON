package com.easter.route.domain.ranking.service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

import com.easter.route.domain.ranking.entity.Ranking;
import com.easter.route.domain.ranking.entity.dto.*;
import com.easter.route.domain.record.entity.Record;
import com.easter.route.domain.route.entity.dto.GetMemberListRequestFeignDto;
import com.easter.route.domain.route.entity.dto.GetMemberListResponseFeignDto;
import com.easter.route.domain.route.entity.dto.MemberInfo;
import com.easter.route.domain.route.service.MemberClient;
import com.easter.route.global.exception.BusinessException;
import com.easter.route.global.response.ResultResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.easter.route.domain.ranking.repository.RankingRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class RankingServiceImpl implements RankingService {

	private final RankingRepository rankingRepository;
	private final MongoTemplate mongoTemplate;
	private final MemberClient memberClient;
	private final ObjectMapper objectMapper;

	@Override
	public GetRankingListDto getRanking(String routeId) {
		Ranking ranking = rankingRepository.findByRouteId(routeId)
				.orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "랭킹 정보가 없습니다."));

		return GetRankingListDto.builder()
				.routeId(routeId)
				.updatedAt(ranking.getUpdatedAt())
				.rankingInfo(ranking.getRankedRecords().stream().map(RankedRecordDto::of).toList())
				.build();
	}

	@Override
	public GetMyRankingDto getMyRanking(String routeId, String memberId) {
		Ranking ranking = rankingRepository.findById(routeId)
				.orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "해당 경로의 랭킹 정보가 없습니다."));



		RankedRecord myRecord = ranking.getRankedRecords().stream()
				.peek()
				.filter((record) -> record.getMemberId().equals(memberId))
				.findFirst()
				.orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "내 랭킹 정보가 없습니다."));
		GetMyRankingDto getMyRankingDto = GetMyRankingDto.builder()
				.routeId(routeId)
				.r
		return null;
	}


	// Spring Scheduler로 오전 00:00에 랭킹리스트가 업데이트 된다.
	@Override
	@Scheduled(cron = "0 0 15 * * *")
	public void updateAllRankingLists() {
		// 모든 routeId를 조회합니다.
		List<Ranking> rankings = rankingRepository.findAll();

		// 각 routeId에 대해 랭킹 업데이트 작업을 수행합니다.
		for (String routeId : routeIds) {
			updateRanking(routeId);
		}
	}
	public void updateRanking(String routeId) {
		Query query = new Query(Criteria.where("routeId").is(routeId).and("completed").is(true));
		List<Record> findRecords = mongoTemplate.find(query, Record.class);
		List<RankedRecord> rankedRecords = findRecords.stream()
				.map(RankedRecord::of)
				.sorted((a, b) -> a.getRunningTime().compareTo(b.getRunningTime()))
				.toList();

		List<UUID> memberIds = rankedRecords.stream().map((rankedRecord -> UUID.fromString(rankedRecord.getMemberId()))).toList();
		GetMemberListRequestFeignDto getMemberListRequestFeignDto = GetMemberListRequestFeignDto.builder().idList(memberIds).build();
		ResponseEntity<ResultResponse> res = memberClient.getMemberInfoList(getMemberListRequestFeignDto);
		if (res.getStatusCode() != HttpStatus.OK) {
			throw new BusinessException(HttpStatus.INTERNAL_SERVER_ERROR, "멤버 서비스에서 정보를 가져오는데 실패했습니다.");
		}
		List<MemberInfo> memberList =
				objectMapper.convertValue(Objects.requireNonNull(res.getBody()).getData(), GetMemberListResponseFeignDto.class).getMemberInfoList();



		Optional<Ranking> ranking = rankingRepository.findByRouteId(routeId);
		if (ranking.isEmpty()) {
			rankingRepository.save(Ranking.builder()
					.routeId(routeId)
					.rankedRecords(rankedRecords)
					.build());
		} else {
			ranking.get().updateRanking(rankedRecords);
			rankingRepository.save(ranking.get());
		}
	}
}