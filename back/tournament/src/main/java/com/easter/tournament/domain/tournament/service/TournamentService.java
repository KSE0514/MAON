package com.easter.tournament.domain.tournament.service;

import com.easter.tournament.domain.tournament.model.dto.GetMarathonDetailResponseDto;
import com.easter.tournament.domain.tournament.model.dto.GetMarathonRequestDto;
import com.easter.tournament.domain.tournament.model.dto.GetMarathonResponseDto;
import com.easter.tournament.domain.tournament.model.dto.SearchMyTournamentResponseDto;
import com.easter.tournament.global.security.PassportDto;

import java.util.List;
import java.util.UUID;

public interface TournamentService {
    List<GetMarathonResponseDto> getMarathon(GetMarathonRequestDto getMarathonRequestDto);

    GetMarathonDetailResponseDto getMarathonDetail(PassportDto passport, UUID uuid);

    List<GetMarathonResponseDto> getMarathonByTitle(String title);

    SearchMyTournamentResponseDto searchMyTournament(PassportDto passport);

}
