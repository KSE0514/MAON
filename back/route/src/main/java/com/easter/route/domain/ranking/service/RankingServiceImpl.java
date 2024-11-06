package com.easter.route.domain.ranking.service;

import java.util.List;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.easter.route.domain.ranking.entity.Ranking;
import com.easter.route.domain.ranking.repository.RankingRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class RankingServiceImpl implements RankingService {

	private final MongoTemplate mongoTemplate;
	private final RankingRepository rankingRepository;

	public void updateRankingForRoute(String routeId) {
		Query query = new Query(Criteria.where("routeId").is(routeId).and("completed").is(true));
		List<Record> findRecords = mongoTemplate.find(query, Record.class);

		// memberId로 nickname, profileImageUrl 가져오기


		// List<RankingRecord> rankingRecords = findRecords.stream()
		// 	.sorted((r1, r2) -> Double.compare(r1.getTotalTime(), r2.getTotalTime()))
		// 	.map(record -> RankingRecord.builder().memberNickname("nickname").memberProfileImageUrl("profileImageUrl")
		// 		.averagePace(record.getAveragePace().toString()).totalTime(record.getTotalTime()).build());

		Query rankQuery = new Query(Criteria.where("route_id").is(routeId));
		Ranking ranking = mongoTemplate.findOne(rankQuery, Ranking.class);

		// 없는 경우
		// if (ranking == null) {
		// 	ranking = Ranking.builder()
		// 		.routeId(routeId)
		// 		.rankingRecords(rankingRecords)
		// 		.build();
		// } else {
		// 	// 랭킹이 있는 경우 기존 랭킹을 지우고 새로운 랭킹을 넣어준다.
		// 	ranking.getRankingRecords().clear();
		// 	ranking.getRankingRecords().addAll(rankingRecords);
		// }
		// rankingRepository.save(rank);
	}
}