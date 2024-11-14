package com.easter.member.domain.challenge.repository;

import com.easter.member.domain.challenge.entity.Challenge;
import com.easter.member.domain.challenge.entity.QChallenge;
import com.easter.member.domain.challenge.entity.QChallengeProgress;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ChallengeQueryRepository {

    private final JPAQueryFactory queryFactory;
    QChallenge challenge = QChallenge.challenge;
    QChallengeProgress challengeProgress = QChallengeProgress.challengeProgress;

    public Challenge findFirstChallenge() {
        return queryFactory.selectFrom(challenge).orderBy(challenge.id.asc()).fetchFirst();
    }

}
