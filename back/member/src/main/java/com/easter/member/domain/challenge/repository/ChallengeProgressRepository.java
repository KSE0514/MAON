package com.easter.member.domain.challenge.repository;

import com.easter.member.domain.challenge.entity.ChallengeProgress;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChallengeProgressRepository extends JpaRepository<ChallengeProgress, Long> {
    <S extends ChallengeProgress> S save(S entity);
}
