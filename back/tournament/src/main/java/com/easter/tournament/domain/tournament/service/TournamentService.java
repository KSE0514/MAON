package com.easter.tournament.domain.tournament.service;

import com.easter.tournament.domain.tournament.model.dto.GetMarathonRequestDto;
import com.easter.tournament.domain.tournament.model.dto.GetMarathonResponseDto;

import java.util.List;
import java.util.UUID;

public interface TournamentService {
    List<GetMarathonResponseDto> getMarathon(GetMarathonRequestDto getMarathonRequestDto);

    GetMarathonResponseDto getMarathonDetail(UUID uuid);

    List<GetMarathonResponseDto> getMarathonByTitle(String title);
}
