package com.easter.member.domain.member.service;

import com.easter.member.domain.member.entity.Member;
import com.easter.member.domain.member.model.dto.RegisterMemberRequestDto;
import com.easter.member.domain.member.model.dto.RegisterMemberResponseDto;
import com.easter.member.domain.member.repository.MemberRepository;
import com.easter.member.global.exception.BusinessException;
import com.easter.member.global.security.jwt.TokenProvider;
import com.easter.member.global.security.userinfo.PassportDto;
import com.easter.member.global.security.userinfo.Role;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberServiceImpl implements MemberService {

    private final MemberRepository MemberRepository;
    private final TokenProvider tokenProvider;

    @Override
    @Transactional
    public RegisterMemberResponseDto registerMember(PassportDto passport, RegisterMemberRequestDto dto) {
        if(!dto.getEmail().equals(passport.getEmail())) {
            throw new BusinessException(HttpStatus.BAD_REQUEST, "타 사용자의 이메일로 가입을 시도하고 있습니다.");
        }
        // 주어진 정보를 기반으로 entity 구축
        Date date;
        try {
            SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
            date = formatter.parse(dto.getBirthDate());
        } catch(ParseException e) {
            log.error("invalid date format : {}", dto.getBirthDate());
            throw new BusinessException(HttpStatus.BAD_REQUEST, "잘못된 날짜 형식입니다.");
        }
        Member member = Member.builder()
                .name(dto.getName())
                .nickname(dto.getNickname())
                .gender(dto.getGender())
                .email(dto.getEmail())
                .height(dto.getHeight())
                .weight(dto.getWeight())
                .birthDate(date)
                .address(dto.getAddress())
                .phoneNumber(dto.getPhoneNumber())
                .imageUrl(dto.getImageUrl())
                .build();
        member = MemberRepository.save(member);
        log.info("registered new member : {} - {}", member.getUuid(), member.getNickname());
        // 이후 새롭게 accessToken 발급
        PassportDto newPassport = PassportDto.builder()
                .id(member.getUuid())
                .name(member.getName())
                .nickname(member.getNickname())
                .email(member.getEmail())
                .imageUrl(member.getImageUrl())
                .role(Role.REGISTERED)
                .build();
        String token = tokenProvider.generateAccessToken(newPassport);
        return RegisterMemberResponseDto.builder()
                .id(member.getUuid())
                .name(member.getName())
                .email(member.getEmail())
                .imageUrl(member.getImageUrl())
                .accessToken(token)
                .build();
    }

    @Override
    public void logout(String email) {
        log.info("logout : {}", email);
        tokenProvider.removeToken(email);
    }
}
