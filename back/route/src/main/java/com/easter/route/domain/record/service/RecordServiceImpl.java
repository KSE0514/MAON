package com.easter.route.domain.record.service;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.easter.route.domain.record.entity.Record;
import com.easter.route.domain.record.entity.dto.CreateRunningDto;
import com.easter.route.domain.record.entity.dto.RecordDto;
import com.easter.route.domain.record.entity.dto.UpdateRecordDto;
import com.easter.route.domain.record.repository.RecordRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class RecordServiceImpl implements RecordService {

	private final MongoTemplate mongoTemplate;
	private final RecordRepository recordRepository;

	@Override
	public Record createRunning(CreateRunningDto createRunningDto) {
		Record record = Record.builder()
			.completed(false)
			.runningTime("00:00:00")
			.averagePace("00'00\"")
			.routeId(createRunningDto.getRouteId())
			.build();
		log.error("레코드 @@@@@@@@@@@@@@@@@: {}", record);
		return recordRepository.save(record);
	}

	@Override
	public void updateRecord(UpdateRecordDto updateRecordDto) {
		Record record = recordRepository.findById(updateRecordDto.getRecordId())
			.orElseThrow(() -> new IllegalArgumentException("Record not found"));
		record.updateRecord(updateRecordDto);
	}

	@Override
	public List<RecordDto> getRecordListByMemberId(String memberId) {
		Query query = new Query(Criteria.where("memberId").is(memberId));
		query.with(Sort.by(Sort.Direction.DESC, "createdAt"));
		List<Record> records = mongoTemplate.find(query, Record.class);
		return records.stream().map(RecordDto::of).toList();
	}
}
