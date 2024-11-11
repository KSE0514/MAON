package com.easter.route.domain.record.service;

import java.time.Duration;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

import com.easter.route.domain.record.entity.Record;
import com.easter.route.domain.record.entity.dto.LocationDto;

import com.easter.route.domain.record.entity.dto.RecordDto;
import com.easter.route.domain.record.entity.dto.RunningResultDto;
import com.easter.route.domain.record.entity.dto.UpdateRecordDto;
import com.easter.route.domain.record.repository.RecordRepository;
import com.easter.route.domain.route.entity.Route;
import com.easter.route.domain.route.repository.RouteRepository;
import com.easter.route.global.exception.BusinessException;
import com.easter.route.global.utils.DistanceCalculator;
import com.easter.route.global.utils.GoogleGeoCoding;
import com.easter.route.global.utils.PaceCalculator;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.core.geo.GeoJsonLineString;
import org.springframework.http.HttpStatus;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.Acknowledgment;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class RunningInfoConsumer {

	private final RecordService recordService;
	private final RecordRepository recordRepository;
	private final RouteRepository routeRepository;
	private final ConcurrentHashMap<String, List<LocationDto>> runningInfoMap= new ConcurrentHashMap<>();

	// Kafka recordId를 key로 메시지가 쌓이고, 그 값은 Map에 저장된다.
	// 발생할 수 있는 동시성 이슈들
	// 1. 동일 recordId에 대해 동시 업데이트가 발생하는 경우(같은 사용자의 정보가 서로 다른 카프카 파티션에서 처리될 때)
	// 2. 위치 정보 리스트에서 동시에 여러 데이터가 추가 되는 경우
	// 3. 심박수 계산 시 Race Condition
	// 4. Map 초기화와 동시에 접근할 때
	@KafkaListener(topics = "maon.route.location", groupId = "running.group", containerFactory = "locationKafkaListenerContainerFactory")
	public void listenLocation(LocationDto locationDto, Acknowledgment acknowledgment) {
		try {
			log.info("Received location data: {}", locationDto);
			String recordId = locationDto.getRecordId();
			runningInfoMap.computeIfAbsent(recordId, k -> new CopyOnWriteArrayList<>()).add(locationDto);
			acknowledgment.acknowledge();
		} catch (Exception e) {
			log.error("Failed to acknowledge message: {}", locationDto, e);
		}
	}

	public List<LocationDto> getRunningInfo(String recordId) {
		return runningInfoMap.getOrDefault(recordId, new CopyOnWriteArrayList<>());
	}

	public void clearRunningInfo(String recordId) {
		runningInfoMap.remove(recordId);
	}

	public List<String> getPaceList(String recordId) {
		List<LocationDto> list = getRunningInfo(recordId);
		return list.stream().map(LocationDto::getPace).toList();
	}

	public int getAverageHeartRate(String recordId) {
		List<LocationDto> list = getRunningInfo(recordId);
		return list.stream().mapToInt(LocationDto::getHeartRate).sum() / list.size();
	}

	public GeoJsonLineString getRecordedTrack(String recordId) {
		List<LocationDto> list = getRunningInfo(recordId);
		return new GeoJsonLineString(list.stream().map(LocationDto::getPoint).toList());
	}

	public String timeDifference(String startTime, String endTime) {
		LocalTime start = LocalTime.parse(startTime);
		LocalTime end = LocalTime.parse(endTime);

		Duration duration = Duration.between(start, end);
		long hours = duration.toHours();
		long minutes = duration.toMinutesPart();
		long seconds = duration.toSecondsPart();

		return String.format("%02d:%02d:%02d", hours, minutes, seconds);
	}

	@Transactional
	public RunningResultDto finish(String recordId) {
		Record record = recordRepository.findById(recordId)
				.orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "레코드가 존재하지 않습니다: recordId = " + recordId));
		// 시간 순서로 정렬
		runningInfoMap.get(recordId).sort((a, b) -> a.getTime().compareTo(b.getTime()));

		// 계산
		List<LocationDto> list = getRunningInfo(recordId);
		List<String> paceList = getPaceList(recordId);
		int averageHeartRate = getAverageHeartRate(recordId);
		GeoJsonLineString recordedTrack = getRecordedTrack(recordId);
		String runningTime = list.size() > 2 ? timeDifference(list.get(0).getTime(), list.get(list.size()-1).getTime()): "00:00:00";
		double distance = !list.isEmpty() ? list.get(list.size() - 1).getRunningDistance() : 0;
		String averagePace = PaceCalculator.calculateAveragePace(paceList);

		boolean isCompleted = false;
		String startPoint;
		Optional<Route> route = routeRepository.findById(record.getRouteId());
		if (route.isPresent()) {
			Route findRoute = route.get();
			List<Point> coordinates =  findRoute.getTrack().getCoordinates();
			Point endPoint = coordinates.get(coordinates.size() - 1);
			// 사용자가 달린 거리가 등록된 경로의 총 길이 이상이고, 도착지점과 10m 이내라면 완주로 처리한다.
			if (findRoute.getDistance() <= distance && DistanceCalculator.isWithinDistance(
					endPoint.getX(),
					endPoint.getY(),
					Double.parseDouble(list.get(list.size() - 1).getLatitude()),
					Double.parseDouble(list.get(list.size() - 1).getLongitude()),
					10)) {
				isCompleted = true;
			}
			startPoint = findRoute.getStartPoint();
		} else {
			startPoint = GoogleGeoCoding.getAddress(Double.parseDouble(list.get(0).getLatitude()), Double.parseDouble(list.get(0).getLongitude()));
		}

		UpdateRecordDto updateRecordDto = UpdateRecordDto.builder()
				.recordId(recordId)
				.runningInfo(list)
				.paceList(paceList)
				.averageHeartRate(averageHeartRate)
				.distance(distance)
				.averagePace(averagePace)
				.recordedTrack(recordedTrack)
				.runningTime(runningTime)
				.completed(isCompleted)
				.build();

		recordService.updateRecord(updateRecordDto);
		clearRunningInfo(recordId);
		Record updatedRecord = recordRepository.findById(recordId)
				.orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "레코드가 존재하지 않습니다: recordId = " + recordId));

		return new RunningResultDto(startPoint, RecordDto.of(updatedRecord), "end");
	}
}
