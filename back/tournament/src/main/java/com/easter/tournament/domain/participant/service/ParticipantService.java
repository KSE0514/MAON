package com.easter.tournament.domain.participant.service;

import com.easter.tournament.domain.participant.model.dto.ParticipantRequestDto;
import jakarta.validation.Valid;

public interface ParticipantService {
    void marathonJoin(ParticipantRequestDto participantRequestDto);
}
