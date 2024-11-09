package com.easter.tournament.domain.team.service;

import com.easter.tournament.domain.participant.entity.Participant;
import com.easter.tournament.domain.participant.model.ParticipantStatus;
import com.easter.tournament.domain.participant.repository.ParticipantQueryRepository;
import com.easter.tournament.domain.participant.repository.ParticipantRepository;
import com.easter.tournament.domain.team.entity.Team;
import com.easter.tournament.domain.team.model.dto.*;
import com.easter.tournament.domain.team.repository.TeamRepository;
import com.easter.tournament.domain.tournament.entity.Tournament;
import com.easter.tournament.domain.tournament.repository.TournamentRepository;
import com.easter.tournament.global.exception.BusinessException;
import com.easter.tournament.global.security.PassportDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestClient;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {

    @Value("${external-url.member}")
    private String memberUrl;

    private final TeamRepository teamRepository;
    private final TournamentRepository tournamentRepository;
    private final ParticipantQueryRepository participantQueryRepository;
    private final ParticipantRepository participantRepository;
    private final RestClient restClient;
    private final ObjectMapper objectMapper;

    @Override
    @Transactional
    public CreateTeamResponseDto createTeam(PassportDto passport, CreateTeamRequestDto dto) {
        if (!passport.getId().equals(dto.getMemberId())) {
            log.error("there is discrepancy between member and passport : {} - {} ", dto.getMemberId(), passport.getId());
            throw new BusinessException(HttpStatus.UNAUTHORIZED, "자기 자신의 팀만 만들 수 있습니다.");
        }
        Tournament tournament = tournamentRepository.findByUuid(dto.getTournamentId());
        if (tournament == null) {
            log.error("tournament not found");
            throw new BusinessException(HttpStatus.BAD_REQUEST, "경기 정보를 찾을 수 없습니다.");
        }
        Participant participant = participantQueryRepository.findParticipant(dto.getMemberId(), tournament.getId());
        // 잘 참여하고 있는가를 확인
        if (participant == null || participant.getStatus() == ParticipantStatus.CANCEL) {
            log.error("participant not found or canceled");
            throw new BusinessException(HttpStatus.BAD_REQUEST, "해당 경기에 정상 참가한 사용자가 아닙니다.");
        }
        if (participant.getTeamId() != null) {
            log.error("this member already joined team");
            throw new BusinessException(HttpStatus.BAD_REQUEST, "이미 팀이 있는 회원입니다.");
        }
        // [1] 팀 생성
        Team team = Team.builder()
                .name(dto.getName())
                .tournament(tournament)
                .build();
        teamRepository.save(team);
        // [2] 팀 참여목록에 자기자신 추가
        participant = participant.toBuilder().teamId(team.getId()).build();
        participantRepository.save(participant);
        return CreateTeamResponseDto.builder()
                .teamId(team.getUuid())
                .tournamentId(tournament.getUuid())
                .build();
    }

    @Override
    public SearchTeamMemberResponseDto searchTeamMember(UUID teamId) {
        Team team = teamRepository.findByUuid(teamId).orElseThrow(() -> new BusinessException(HttpStatus.BAD_REQUEST, "유효하지 않은 정보입니다."));
        List<UUID> memberIdList = participantQueryRepository.findMemberIdByTeamId(team.getId());
        ResponseEntity<Map> memberResponse = restClient.post().uri(memberUrl + "/service/search").contentType(MediaType.APPLICATION_JSON)
                .body(SearchMemberRequestDto.builder().idList(memberIdList).build())
                .retrieve()
                .onStatus(HttpStatusCode::is4xxClientError, (request, response) -> {
                    throw new BusinessException(HttpStatus.BAD_REQUEST, "멤버 서비스와 통신 실패");
                })
                .onStatus(HttpStatusCode::is5xxServerError, (request, response) -> {
                    throw new BusinessException(HttpStatus.INTERNAL_SERVER_ERROR, "멤버 서비스와 통신 실패");
                })
                .toEntity(Map.class);
        SearchMemberResponseDto memberResponseDto = objectMapper.convertValue(memberResponse.getBody().get("data"), SearchMemberResponseDto.class);
        List<TeamMemberDto> responseList = new ArrayList<>();
        for (MemberDto memberDto : memberResponseDto.getMemberInfoList()) {
            responseList.add(TeamMemberDto.builder()
                    .id(memberDto.getId())
                    .email(memberDto.getEmail())
                    .imageUrl(memberDto.getImageUrl())
                    .nickname(memberDto.getNickname())
                    .build());
        }
        return SearchTeamMemberResponseDto.builder()
                .teamMemberList(responseList)
                .build();
    }
}
