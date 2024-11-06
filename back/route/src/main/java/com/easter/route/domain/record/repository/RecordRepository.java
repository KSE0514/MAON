package com.easter.route.domain.record.repository;


import com.easter.route.domain.record.entity.Record;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RecordRepository extends MongoRepository<Record, String> {
}
