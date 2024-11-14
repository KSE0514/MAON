package com.easter.member.domain.challenge.service;

import com.easter.member.global.security.userinfo.PassportDto;

public interface ChallengeService {
    void initChallenge(PassportDto passport);
}
