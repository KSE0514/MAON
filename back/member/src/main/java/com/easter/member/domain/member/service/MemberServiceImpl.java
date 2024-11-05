package com.easter.member.domain.member.service;

import com.easter.member.domain.member.entity.Member;
import com.easter.member.domain.member.model.dto.ConfirmMemberResponseDto;
import com.easter.member.domain.member.model.dto.PassportDto;
import com.easter.member.domain.member.repository.MemberRepository;
import com.easter.member.global.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberServiceImpl implements MemberService {

    private final MemberRepository MemberRepository;

    @Override
    public ConfirmMemberResponseDto confirmMember(String email) {
        Optional<Member> optionalMember = MemberRepository.findByEmail(email);
        PassportDto passport;
        if (optionalMember.isPresent()) {
            // 찾는데에 성공했다면 정보를 담는다
            Member member = optionalMember.get();
            log.info("found member : {}", email);
            passport = PassportDto.builder()
                    .id(member.getUuid())
                    .name(member.getName())
                    .nickname(member.getNickname())
                    .email(member.getEmail())
                    .imageUrl(member.getImageUrl())
                    .build();
        } else {
            log.info("unfounded member : {}", email);
            passport = PassportDto.builder()
                    .email(email)
                    .build();
        }
        return ConfirmMemberResponseDto.builder()
                .registered(optionalMember.isPresent())
                .passport(passport)
                .build();
    }
}
