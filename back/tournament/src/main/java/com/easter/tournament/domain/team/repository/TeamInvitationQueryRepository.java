package com.easter.tournament.domain.team.repository;

import com.easter.tournament.domain.team.entity.QTeamInvitation;
import com.easter.tournament.domain.team.entity.TeamInvitation;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
@RequiredArgsConstructor
public class TeamInvitationQueryRepository {
    private final JPAQueryFactory queryFactory;
    private final QTeamInvitation teamInvitation = QTeamInvitation.teamInvitation;

    public TeamInvitation findDuplicatedRequest(UUID inviterId, UUID inviteeId, long teamId) {
        return queryFactory.selectFrom(teamInvitation).where(
                teamInvitation.inviterId.eq(inviterId).and(
                        teamInvitation.inviteeId.eq(inviteeId).and(
                                teamInvitation.teamId.eq(teamId).and(teamInvitation.valid.eq(true))
                        )
                )
        ).fetchOne();
    }

    public List<UUID> findWaitingMemberId(long teamId) {
        return queryFactory.select(teamInvitation.inviteeId).from(teamInvitation).where(
                teamInvitation.valid.eq(true).and(
                        teamInvitation.teamId.eq(teamId)
                )
        ).fetch();
    }
}
