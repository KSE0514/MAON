package com.easter.tournament.domain.tournament.service;

import com.easter.tournament.domain.tournament.entity.Tournament;
import com.easter.tournament.domain.tournament.model.dto.GetMarathonRequestDto;
import com.easter.tournament.domain.tournament.model.dto.GetMarathonResponseDto;
import com.easter.tournament.domain.tournament.repository.TournamentQueryRepository;
import com.easter.tournament.domain.tournament.repository.TournamentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class TournamentServiceImpl implements TournamentService {

    private final TournamentRepository tournamentRepository;
    private final TournamentQueryRepository tournamentQueryRepository;

    @Override
    public List<GetMarathonResponseDto> getMarathon(GetMarathonRequestDto getMarathonRequestDto) {

        Integer year = getMarathonRequestDto.getYear();
        Integer month = getMarathonRequestDto.getMonth();
        Integer area = getMarathonRequestDto.getArea();

        List<Tournament> tournaments = tournamentQueryRepository.findByYearAndMonth(year, month, area);

        List<GetMarathonResponseDto> getMarathonResponseDtos = tournaments.stream().map(
                tournament -> {
                    return GetMarathonResponseDto.builder()
                            .title(tournament.getTitle())
                            .host(tournament.getHost())
                            .uuid(tournament.getUuid())
                            .homepage(tournament.getHomepage())
                            .location(tournament.getLocation())
                            .receiptStart(tournament.getReceiptStart())
                            .receiptEnd(tournament.getReceiptEnd())
                            .tournamentDayStart(tournament.getTournamentDayStart())
                            .tournamentDayEnd(tournament.getTournamentDayEnd())
                            .closed(tournament.isClosed())
                            .build();
                }
        ).toList();

        return getMarathonResponseDtos;
    }

    @Override
    public GetMarathonResponseDto getMarathonDetail(UUID uuid) {

        Tournament tournament = tournamentRepository.findByUuid(uuid);

        GetMarathonResponseDto getMarathonResponseDto = GetMarathonResponseDto.builder()
                .uuid(tournament.getUuid())
                .title(tournament.getTitle())
                .host(tournament.getHost())
                .homepage(tournament.getHomepage())
                .location(tournament.getLocation())
                .receiptStart(tournament.getReceiptStart())
                .receiptEnd(tournament.getReceiptEnd())
                .tournamentDayStart(tournament.getTournamentDayStart())
                .tournamentDayEnd(tournament.getTournamentDayEnd())
                .closed(tournament.isClosed())
                .build();

        return getMarathonResponseDto;
    }

    @Override
    public List<GetMarathonResponseDto> getMarathonByTitle(String title) {

        List<Tournament> tournaments = tournamentRepository.findByTitleLike(title);

        List<GetMarathonResponseDto> getMarathonResponseDtos = tournaments.stream().map(
                tournament -> {
                    return GetMarathonResponseDto.builder()
                            .uuid(tournament.getUuid())
                            .title(tournament.getTitle())
                            .host(tournament.getHost())
                            .homepage(tournament.getHomepage())
                            .location(tournament.getLocation())
                            .receiptStart(tournament.getReceiptStart())
                            .receiptEnd(tournament.getReceiptEnd())
                            .tournamentDayStart(tournament.getTournamentDayStart())
                            .tournamentDayEnd(tournament.getTournamentDayEnd())
                            .closed(tournament.isClosed())
                            .build();
                }
        ).toList();

        return getMarathonResponseDtos;
    }
}
