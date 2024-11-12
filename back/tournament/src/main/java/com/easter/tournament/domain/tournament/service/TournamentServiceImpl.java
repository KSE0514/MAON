package com.easter.tournament.domain.tournament.service;

import com.easter.tournament.domain.participant.entity.Participant;
import com.easter.tournament.domain.participant.model.ParticipantStatus;
import com.easter.tournament.domain.participant.repository.ParticipantQueryRepository;
import com.easter.tournament.domain.participant.repository.ParticipantRepository;
import com.easter.tournament.domain.team.entity.Team;
import com.easter.tournament.domain.team.model.dto.TeamMemberDto;
import com.easter.tournament.domain.team.service.TeamService;
import com.easter.tournament.domain.tournament.entity.Tournament;
import com.easter.tournament.domain.tournament.model.dto.*;
import com.easter.tournament.domain.tournament.repository.TournamentQueryRepository;
import com.easter.tournament.domain.tournament.repository.TournamentRepository;
import com.easter.tournament.global.exception.BusinessException;
import com.easter.tournament.global.security.PassportDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class TournamentServiceImpl implements TournamentService {

    private final TournamentRepository tournamentRepository;
    private final TournamentQueryRepository tournamentQueryRepository;
    private final ParticipantRepository participantRepository;
    private final ParticipantQueryRepository participantQueryRepository;
    private final TeamService teamService;

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
    public GetMarathonDetailResponseDto getMarathonDetail(PassportDto passport, UUID uuid) {

        Tournament tournament = tournamentQueryRepository.findByUuid(uuid);
        if(tournament == null) {
            log.error("invalid tournament uuid : {}", uuid);
            throw new BusinessException(HttpStatus.BAD_REQUEST, "유효하지 않은 값입니다.");
        }
        List<String> categoryValues = tournament.getTournamentAssignment().stream().map(
                tournamentAssignment -> {
                    return tournamentAssignment.getCategory().getCategoryValue();
                }
        ).toList();
        // 경기 정보부터 삽입
        GetMarathonDetailResponseDto responseDto = GetMarathonDetailResponseDto.builder()
                .uuid(tournament.getUuid())
                .title(tournament.getTitle())
                .host(tournament.getHost())
                .homepage(tournament.getHomepage())
                .location(tournament.getLocation())
                .receiptStart(tournament.getReceiptStart())
                .receiptEnd(tournament.getReceiptEnd())
                .tournamentDayStart(tournament.getTournamentDayStart())
                .tournamentDayEnd(tournament.getTournamentDayEnd())
                .latitude(tournament.getLatitude())
                .longitude(tournament.getLongitude())
                .closed(tournament.isClosed())
                .categories(categoryValues)
                .build();
        // 참여여부, 팀 여부를 알아내기 위해 서치
        Participant participant = participantQueryRepository.findParticipantFetch(passport.getId(), tournament.getId());
        if(participant == null || participant.getStatus() == ParticipantStatus.CANCEL) {
            return responseDto;
        }
        responseDto.setParticipated(true);
        Team team = participant.getTeam();
        if(team == null) { // 팀이 없는 경우 그대로 반환
            return responseDto;
        }
        responseDto.setHasTeam(true);
        List<TeamMemberDto> memberList = teamService.searchTeamMember(team.getUuid()).getTeamMemberList();
        responseDto.setTeamMembers(memberList);
        return responseDto;
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
