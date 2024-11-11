package com.easter.tournament.domain.team.repository;

import com.easter.tournament.domain.team.entity.TeamInvitation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamInvitationRepository extends JpaRepository<TeamInvitation, Long> {
    <S extends TeamInvitation> S save(S s);
}
