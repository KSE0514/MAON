package com.easter.tournament.domain.participant.repository;

import com.easter.tournament.domain.participant.entity.Participant;
import com.easter.tournament.domain.participant.entity.QParticipant;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
@RequiredArgsConstructor
public class ParticipantQueryRepository {
    private final JPAQueryFactory queryFactory;
    private final  QParticipant participant = QParticipant.participant;

    public Participant findParticipant(UUID memberId, long tournamentId) {
        return queryFactory.selectFrom(participant).where(
                        participant.memberId.eq(memberId).and(
                                participant.tournamentId.eq(tournamentId)
                        )
                ).fetchOne();
    }

    public List<UUID> findMemberIdByTeamId(long teamId) {
        return queryFactory.select(participant.memberId).from(participant).where(
                participant.teamId.eq(teamId)
        ).fetch();
    }

    public List<UUID> findCandidateByTournamentId(long tournamentId) {
        return queryFactory.select(participant.memberId).from(participant).where(
                participant.tournamentId.eq(tournamentId).and(
                        participant.teamId.isNull()
                )
        ).fetch();
    }

}
