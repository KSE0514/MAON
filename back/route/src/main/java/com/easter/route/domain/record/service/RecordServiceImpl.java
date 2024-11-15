package com.easter.route.domain.record.service;

import java.time.LocalDateTime;
import java.util.List;

import com.easter.route.domain.record.entity.dto.CreateRunningResponseDto;
import com.easter.route.global.security.PassportDto;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.easter.route.domain.record.entity.Record;
import com.easter.route.domain.record.entity.dto.CreateRunningRequestDto;
import com.easter.route.domain.record.entity.dto.RecordDto;
import com.easter.route.domain.record.entity.dto.UpdateRecordDto;
import com.easter.route.domain.record.entity.enums.RecordType;
import com.easter.route.domain.record.repository.RecordRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class RecordServiceImpl implements RecordService {

	private final RecordRepository recordRepository;
	private final MongoTemplate mongoTemplate;

	@Override
	public CreateRunningResponseDto createRunning(PassportDto passport, CreateRunningRequestDto createRunningRequestDto) {
		Record record = Record.builder()
			.memberId(passport.getId().toString())
			.recordType(RecordType.valueOf(createRunningRequestDto.getRecordType()))
			.completed(false)
			.runningTime("00:00:00")
			.averagePace("00'00\"")
			.averageHeartRate(0)
			.distance(0)
			.createdAt(LocalDateTime.now())
			.routeId(createRunningRequestDto.getRouteId())
			.build();
		log.error("레코드: {}", record);
		recordRepository.save(record);
		String id = record.getId();
		return CreateRunningResponseDto.builder()
				.recordId(id)
				.memberId(passport.getId())
				.build();
//		return recordRepository.save(record);
	}

	@Override
	public Record updateRecord(UpdateRecordDto updateRecordDto) {
		Record record = recordRepository.findById(updateRecordDto.getRecordId())
			.orElseThrow(() -> new IllegalArgumentException("Record not found"));
		record.updateRecord(updateRecordDto);
		return recordRepository.save(record);
	}

	@Override
	public List<RecordDto> getRecordListByMemberId(String memberId) {
		Query query = new Query(Criteria.where("memberId").is(memberId));
		query.with(Sort.by(Sort.Direction.DESC, "createdAt"));
		List<Record> records = mongoTemplate.find(query, Record.class);
		return records.stream().map(RecordDto::of).toList();
	}
}
