package com.easter.tournament.domain.participant.service;

import com.easter.tournament.domain.participant.entity.Participant;
import com.easter.tournament.domain.participant.model.ParticipantStatus;
import com.easter.tournament.domain.participant.model.dto.ParticipantRequestDto;
import com.easter.tournament.domain.participant.repository.ParticipantRepository;
import com.easter.tournament.domain.team.repository.TeamRepository;
import com.easter.tournament.domain.tournament.entity.Tournament;
import com.easter.tournament.domain.tournament.repository.TournamentRepository;
import com.easter.tournament.global.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class ParticipantServiceImpl implements ParticipantService {

    private final ParticipantRepository participantRepository;
    private final TournamentRepository tournamentRepository;
    private final TeamRepository teamRepository;

    @Override
    public void marathonJoin(ParticipantRequestDto participantRequestDto) {

        Optional<Tournament> tournament = tournamentRepository.findById(participantRequestDto.getTournamentId());
        
        //TODO: 팀도 찾아야 할듯 합니다

        if (tournament.isPresent()) {

            if(tournament.get().isClosed()) {
                throw new BusinessException(HttpStatus.NOT_EXTENDED, "대회 접수 기간이 아닙니다.");
            }

            Optional<Participant> byMemberIdAndTournament = participantRepository.findByMemberIdAndTournament(participantRequestDto.getMemberId(), participantRequestDto.getTournamentId());
            if (byMemberIdAndTournament.isPresent()) {
                throw new BusinessException(HttpStatus.CONFLICT, "이미 참가 한 사람입니다.");
            }

            Participant participant = Participant.builder()
                    .createTime(LocalDateTime.now())
                    .updateTime(LocalDateTime.now())
                    .tournament(tournament.get())
                    .uuid(UUID.randomUUID())
                    //.team()
                    .status(ParticipantStatus.DONE)
                    .tournamentCategory(participantRequestDto.getTournamentCategory())
                    .memberId(participantRequestDto.getMemberId())
                    .build();
            
            participantRepository.save(participant);

        } else {
            throw new BusinessException(HttpStatus.NOT_FOUND, "참가하려는 대회가 없습니다.");
        }

    }

}
