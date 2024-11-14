package com.easter.route.domain.ranking.service;

import java.util.ArrayList;
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

import feign.FeignException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Service
@Slf4j
public class RankingServiceImpl implements RankingService {

	private final RankingRepository rankingRepository;
	private final MongoTemplate mongoTemplate;
	private final MemberClient memberClient;
	private final ObjectMapper objectMapper;

	@Override
	public GetRankingListDto getRankingList(String routeId) {
		Ranking ranking = rankingRepository.findByRouteId(routeId)
				.orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "랭킹 정보가 없습니다."));

		return GetRankingListDto.builder()
			.routeId(routeId)
			.updatedAt(ranking.getUpdatedAt())
			.rankingInfo(ranking.getRankedRecords().stream().map(RankedRecordDto::of).toList())
			.updatedAt(ranking.getUpdatedAt())
			.build();
	}

	@Override
	public GetMyRankingDto getMyRanking(String routeId, String memberId) {
		Ranking ranking = rankingRepository.findById(routeId)
				.orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "해당 경로의 랭킹 정보가 없습니다."));

		int myRank = 0;
		RankedRecord myRecord = null;
		for (int i = 0; i < ranking.getRankedRecords().size(); i++) {
			if (ranking.getRankedRecords().get(i).getMemberId().equals(memberId)) {
				myRank = i + 1;
				myRecord = ranking.getRankedRecords().get(i);
				break;
			}
		}

		if (myRecord == null) {
			throw new BusinessException(HttpStatus.NOT_FOUND, "해당 회원의 랭킹 정보가 없습니다.");
		}

		return GetMyRankingDto.builder()
			.routeId(routeId)
			.recordId(myRecord.getRecordId())
			.memberId(memberId)
			.memberNickname(myRecord.getMemberNickname())
			.memberProfileUrl(myRecord.getMemberProfileUrl())
			.recordId(myRecord.getRecordId())
			.ranking(myRank)
			.build();
	}


	// Spring Scheduler로 오전 00:00에 랭킹리스트가 업데이트 된다.
	@Override
	@Scheduled(cron = "0 0 15 * * *")
	public void updateAllRankingList() {
		List<Ranking> rankings = rankingRepository.findAll();
		log.info("랭킹 수: {}", rankings.size());
		for(int i = 0; i < rankings.size(); i++) {
			log.info("랭킹 {}/{}", i + 1, rankings.get(i).getRouteId());
		}
		rankings.forEach(this::updateRanking);
	}

	public void updateRanking(Ranking ranking) {
		String routeId = ranking.getRouteId();
		Query query = new Query(Criteria.where("routeId").is(routeId).and("completed").is(true));
		List<Record> findRecords = mongoTemplate.find(query, Record.class);
		List<RankedRecord> rankedRecords = findRecords.stream()
				.map(RankedRecord::of)
				.sorted((a, b) -> a.getRunningTime().compareTo(b.getRunningTime()))
				.toList();

		// 멤버 정보 가져오기
		List<UUID> memberIds = rankedRecords.stream().map((rankedRecord -> UUID.fromString(rankedRecord.getMemberId()))).toList();
		GetMemberListRequestFeignDto getMemberListRequestFeignDto = GetMemberListRequestFeignDto.builder().idList(memberIds).build();
		ResponseEntity<ResultResponse> res = memberClient.getMemberInfoList(getMemberListRequestFeignDto);
		if (res.getStatusCode() != HttpStatus.OK) {
			throw new BusinessException(HttpStatus.INTERNAL_SERVER_ERROR, "멤버 서비스에서 정보를 가져오는데 실패했습니다.");
		}

		// 멤버 정보 최신화
		List<MemberInfo> memberList =
				objectMapper.convertValue(Objects.requireNonNull(res.getBody()).getData(), GetMemberListResponseFeignDto.class).getMemberInfoList();
		MemberInfo memberInfo;
		for (int i = 0; i < rankedRecords.size(); i++) {
			memberInfo = memberList.get(i);
			rankedRecords.get(i).updateMemberInfo(memberInfo.getNickname(), memberInfo.getImageUrl());
		}

		// 랭킹 업데이트
		ranking.updateRankingRecords(rankedRecords);
		rankingRepository.save(ranking);
	}

	public void feignTest() {
		// List<UUID> memberIds = new ArrayList<>();
		// GetMemberListRequestFeignDto getMemberListRequestFeignDto = GetMemberListRequestFeignDto.builder().idList(memberIds).build();
		// ResponseEntity<ResultResponse> res = memberClient.getMemberInfoList(getMemberListRequestFeignDto);
		// if (res.getStatusCode() != HttpStatus.OK) {
		// 	throw new BusinessException(HttpStatus.INTERNAL_SERVER_ERROR, "멤버 서비스에서 정보를 가져오는데 실패했습니다.");
		// }
		// // 멤버 정보 최신화
		// List<MemberInfo> memberList =
		// 	objectMapper.convertValue(Objects.requireNonNull(res.getBody()).getData(), GetMemberListResponseFeignDto.class).getMemberInfoList();
		try {
			List<UUID> memberIds = new ArrayList<>();
			GetMemberListRequestFeignDto getMemberListRequestFeignDto = GetMemberListRequestFeignDto.builder()
				.idList(memberIds)
				.build();

			log.info("Feign request DTO: {}", getMemberListRequestFeignDto); // 요청 데이터 로깅

			ResponseEntity<ResultResponse> res = memberClient.getMemberInfoList(getMemberListRequestFeignDto);
			log.info("Feign response status: {}", res.getStatusCode()); // 응답 상태 로깅

			if (res.getStatusCode() != HttpStatus.OK) {
				log.error("Failed to get member info. Status: {}, Body: {}",
					res.getStatusCode(),
					res.getBody()); // 실패 시 응답 바디까지 로깅

				throw new BusinessException(HttpStatus.INTERNAL_SERVER_ERROR,
					String.format("멤버 서비스에서 정보를 가져오는데 실패했습니다. Status: %s", res.getStatusCode()));
			}

			// 멤버 정보 최신화
			ResultResponse resultResponse = res.getBody();
			if (resultResponse == null || resultResponse.getData() == null) {
				log.error("Response body or data is null");
				throw new BusinessException(HttpStatus.INTERNAL_SERVER_ERROR, "멤버 서비스 응답이 올바르지 않습니다.");
			}

			try {
				GetMemberListResponseFeignDto responseDto = objectMapper.convertValue(
					resultResponse.getData(),
					GetMemberListResponseFeignDto.class
				);
				List<MemberInfo> memberList = responseDto.getMemberInfoList();
				log.info("Successfully retrieved {} members", memberList.size()); // 성공 시 결과 개수 로깅

			} catch (IllegalArgumentException e) {
				log.error("Failed to convert response data: {}", e.getMessage(), e);
				throw new BusinessException(HttpStatus.INTERNAL_SERVER_ERROR, "멤버 정보 변환에 실패했습니다.");
			}
		} catch (FeignException e) {
			log.error("Feign client error occurred: status={}, message={}",
				e.status(),
				e.getMessage(),
				e); // Feign 예외 상세 정보 로깅
			throw new BusinessException(HttpStatus.INTERNAL_SERVER_ERROR,
				String.format("멤버 서비스 호출 중 오류가 발생했습니다: %s", e.getMessage()));
		} catch (Exception e) {
			log.error("Unexpected error during member service call: {}", e.getMessage(), e);
			throw new BusinessException(HttpStatus.INTERNAL_SERVER_ERROR,
				"멤버 서비스 호출 중 예상치 못한 오류가 발생했습니다.");
		}
	}
}