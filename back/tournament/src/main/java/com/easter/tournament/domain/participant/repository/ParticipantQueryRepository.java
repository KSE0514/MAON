package com.easter.tournament.domain.participant.repository;

import com.easter.tournament.domain.participant.entity.Participant;
import com.easter.tournament.domain.participant.entity.QParticipant;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
@RequiredArgsConstructor
public class ParticipantQueryRepository {
    private final JPAQueryFactory queryFactory;

    public Participant findParticipant(UUID memberId, long tournamentId) {
        QParticipant participant = QParticipant.participant;
        return queryFactory.selectFrom(participant).where(
                        participant.memberId.eq(memberId).and(
                                participant.tournamentId.eq(tournamentId)
                        )
                ).fetchOne();
    }

    public List<UUID> findMemberIdByTeamId(long teamId) {
        QParticipant participant = QParticipant.participant;
        return queryFactory.select(participant.memberId).from(participant).where(
                participant.teamId.eq(teamId)
        ).fetch();
    }

}
