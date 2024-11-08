package com.easter.tournament.domain.tournament.repository;

import com.easter.tournament.domain.tournament.entity.Tournament;

import java.util.List;

public interface TournamentQueryRepository {
    List<Tournament> findByYearAndMonth(Integer year, Integer month, Integer areaCode, boolean closed);

}
