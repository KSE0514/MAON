package com.easter.member.domain.challenge.service;

import com.easter.member.domain.challenge.entity.Challenge;
import com.easter.member.domain.challenge.entity.ChallengeProgress;
import com.easter.member.domain.challenge.repository.ChallengeProgressRepository;
import com.easter.member.domain.challenge.repository.ChallengeQueryRepository;
import com.easter.member.domain.member.entity.Member;
import com.easter.member.domain.member.repository.MemberRepository;
import com.easter.member.global.security.userinfo.PassportDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChallengeServiceImpl implements ChallengeService{

    private final ChallengeQueryRepository challengeQueryRepository;
    private final ChallengeProgressRepository challengeProgressRepository;
    private final MemberRepository memberRepository;

    @Override
    public void initChallenge(PassportDto passport) {
        Member member = memberRepository.findByEmail(passport.getEmail()).get();
        Challenge first = challengeQueryRepository.findFirstChallenge();
        ChallengeProgress challengeProgress = ChallengeProgress.builder()
                .memberId(member.getId())
                .challengeId(first.getId()) // 가장 첫번째 챌린지를 이용
                .level(first.getLevel())
                .completed(false)
                .progress(0.00)
                .completedTime(null)
                .build();
        challengeProgressRepository.save(challengeProgress);
    }
}
