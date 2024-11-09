package com.easter.tournament.domain.tournament.service;

import com.easter.tournament.domain.participant.repository.ParticipantQueryRepository;
import com.easter.tournament.domain.participant.repository.ParticipantRepository;
import com.easter.tournament.domain.tournament.entity.Tournament;
import com.easter.tournament.domain.tournament.model.dto.GetMarathonRequestDto;
import com.easter.tournament.domain.tournament.model.dto.GetMarathonResponseDto;
import com.easter.tournament.domain.tournament.model.dto.SearchMyTournamentResponseDto;
import com.easter.tournament.domain.tournament.model.dto.MyTournament;
import com.easter.tournament.domain.tournament.repository.TournamentQueryRepository;
import com.easter.tournament.domain.tournament.repository.TournamentRepository;
import com.easter.tournament.global.security.PassportDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class TournamentServiceImpl implements TournamentService {

    private final TournamentRepository tournamentRepository;
    private final TournamentQueryRepository tournamentQueryRepository;
    private final ParticipantRepository participantRepository;
    private final ParticipantQueryRepository participantQueryRepository;

    @Override
    public List<GetMarathonResponseDto> getMarathon(GetMarathonRequestDto getMarathonRequestDto) {

        Integer year = getMarathonRequestDto.getYear();
        Integer month = getMarathonRequestDto.getMonth();
        Integer area = getMarathonRequestDto.getArea();
        boolean closed = getMarathonRequestDto.isClosed();

        List<Tournament> tournaments = tournamentQueryRepository.findByYearAndMonth(year, month, area, closed);

        List<GetMarathonResponseDto> getMarathonResponseDtos = tournaments.stream().map(
                tournament -> {
                    List<String> categoryValues = tournament.getTournamentAssignment().stream().map(
                            tournamentAssignment -> {
                                return tournamentAssignment.getCategory().getCategoryValue();
                            }
                    ).toList();


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
                            .longitude(tournament.getLongitude())
                            .latitude(tournament.getLatitude())
                            .imageUrl(tournament.getImageUrl())
                            .closed(tournament.isClosed())
                            .categories(categoryValues)
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

    @Override
    public SearchMyTournamentResponseDto searchMyTournament(PassportDto passport) {
        List<MyTournament> tournamentList = participantQueryRepository.findMyTournament(passport.getId());
        return SearchMyTournamentResponseDto.builder()
                .tournamentList(tournamentList)
                .build();
    }
}
