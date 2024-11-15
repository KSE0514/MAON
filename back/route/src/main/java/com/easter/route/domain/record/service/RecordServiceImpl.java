package com.easter.route.domain.record.service;

import java.time.LocalDateTime;
import java.util.List;

import com.easter.route.global.exception.BusinessException;
import com.easter.route.global.security.PassportDto;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.easter.route.domain.record.entity.Record;
import com.easter.route.domain.record.entity.dto.CreateRunningDto;
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
	public Record createRunning(PassportDto passport, CreateRunningDto createRunningDto) {
		if(!createRunningDto.getMemberId().equals(passport.getId().toString())) {
			log.error("멤버 id 불일치 : {} - {}", passport.getId(), createRunningDto.getMemberId());
			throw new BusinessException(HttpStatus.BAD_REQUEST, "유효하지 않은 정보입니다.");
		}
		Record record = Record.builder()
			.memberId(createRunningDto.getMemberId())
			.recordType(RecordType.valueOf(createRunningDto.getRecordType()))
			.completed(false)
			.runningTime("00:00:00")
			.averagePace("00'00\"")
			.averageHeartRate(0)
			.distance(0)
			.createdAt(LocalDateTime.now())
			.routeId(createRunningDto.getRouteId())
			.build();
		log.error("레코드: {}", record);
		return recordRepository.save(record);
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
