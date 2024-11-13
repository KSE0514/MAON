package com.easter.member.domain.member.service;

import com.easter.member.domain.member.entity.Member;
import com.easter.member.domain.member.model.dto.*;
import com.easter.member.domain.member.repository.MemberRepository;
import com.easter.member.global.exception.BusinessException;
import com.easter.member.global.s3.S3Service;
import com.easter.member.global.security.jwt.TokenProvider;
import com.easter.member.global.security.userinfo.PassportDto;
import com.easter.member.global.security.userinfo.Role;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.client.utils.URIBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestClient;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.ZoneId;
import java.util.Date;
import java.util.Map;
import java.util.Optional;
import java.util.TimeZone;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    @Value("${external-url.google-oauth}")
    private String googleOauthUrl;

    private final S3Service s3Service;
    private final MemberRepository MemberRepository;
    private final TokenProvider tokenProvider;
    private final RestClient restClient;
    private final ObjectMapper objectMapper;


    @Override
    public LoginResponseDto login(LoginRequestDto dto) {
        // token을 통해 google 서버에 질의를 시도
        ResponseEntity<Map> loginResult = restClient.get().uri(googleOauthUrl+"?id_token="+dto.getToken())
                .retrieve()
                .onStatus(HttpStatusCode::is4xxClientError, (request, response) -> {
                    Map<String, String> bodyMap = objectMapper.readValue(response.getBody(), Map.class);
                    throw new BusinessException(HttpStatus.valueOf(response.getStatusCode().value()), "oauth 정보 접근 실패 : " + bodyMap.get("error_description"));
                })
                .onStatus(HttpStatusCode::is5xxServerError, (request, response) -> {
                    throw new BusinessException(HttpStatus.INTERNAL_SERVER_ERROR, "구글 api 서버에서 문제가 발생했습니다.");
                })
                .toEntity(Map.class);
        Map<String, String> responseMap = loginResult.getBody();
        String email = responseMap.get("email");
        Optional<Member> member = memberRepository.findByEmail(email);
        PassportDto passport;
        LoginResponseDto responseDto;
        if(member.isPresent()) {
            // 이미 가입이 된 회원이라면 그 값을 기반으로 response 작성
            Member memberInfo = member.get();
            passport = PassportDto.builder()
                    .id(memberInfo.getUuid())
                    .name(memberInfo.getName())
                    .nickname(memberInfo.getNickname())
                    .email(memberInfo.getEmail())
                    .imageUrl(memberInfo.getImageUrl())
                    .role(Role.REGISTERED)
                    .build();
            String accessToken = tokenProvider.generateAccessToken(passport);
            String refreshToken = tokenProvider.generateRefreshToken(passport);
            responseDto = LoginResponseDto.builder()
                    .registered(true)
                    .id(memberInfo.getUuid())
                    .name(memberInfo.getName())
                    .email(memberInfo.getEmail())
                    .imageUrl(memberInfo.getImageUrl())
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .build();
        } else {
            // 가입되지 않은 유저라면, 최소한의 값만 삽입
            passport = PassportDto.builder()
                    .id(null)
                    .name((String) responseMap.get("name"))
                    .nickname("")
                    .email(email)
                    .imageUrl((String) responseMap.get("picture"))
                    .role(Role.UNREGISTERED)
                    .build();
            String accessToken = tokenProvider.generateAccessToken(passport);
            String refreshToken = tokenProvider.generateRefreshToken(passport);
            responseDto = LoginResponseDto.builder()
                    .registered(false)
                    .id(null)
                    .name(passport.getName())
                    .email(passport.getEmail())
                    .imageUrl(passport.getImageUrl())
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .build();
        }
        return responseDto;
    }

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
            formatter.setTimeZone(TimeZone.getTimeZone("Asia/Seoul"));
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
        String accessToken = tokenProvider.generateAccessToken(newPassport);
        String refreshToken = tokenProvider.generateRefreshToken(newPassport);
        return RegisterMemberResponseDto.builder()
                .id(member.getUuid())
                .name(member.getName())
                .email(member.getEmail())
                .imageUrl(member.getImageUrl())
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    @Override
    public ReissueTokenResponseDto reissueToken(ReissueTokenRequestDto dto) {
        String newAccessToken = tokenProvider.reissueToken(dto.getRefreshToken());
        return ReissueTokenResponseDto.builder().accessToken(newAccessToken).build();
    }

    @Override
    public void logout(String email) {
        log.info("logout : {}", email);
        tokenProvider.removeToken(email);
    }

    @Override
    @Transactional
    public UpdateMemberResponseDto updateMember(PassportDto passport, UpdateMemberRequestDto dto) {
        Member member = memberRepository.findByEmail(passport.getEmail()).get();
        // [1] 사진 업로드
        String imageUrl = member.getImageUrl();
        if(dto.getProfileImage() != null && !dto.getProfileImage().isEmpty()) {
            imageUrl = s3Service.uploadFile(dto.getProfileImage());
        }
        Date date;
        SimpleDateFormat formatter;
        try {
            formatter = new SimpleDateFormat("yyyyMMdd");
            formatter.setTimeZone(TimeZone.getTimeZone("Asia/Seoul"));
            if(dto.getBirthDate() != null) {
                date = formatter.parse(dto.getBirthDate());
            } else {
                date = member.getBirthDate();
            }

        } catch(ParseException e) {
            log.error("invalid date format : {}", dto.getBirthDate());
            throw new BusinessException(HttpStatus.BAD_REQUEST, "잘못된 날짜 형식입니다.");
        }
        member = member.toBuilder()
                .name(dto.getName() == null ? member.getName() : dto.getName())
                .phoneNumber(dto.getPhoneNumber() == null ? member.getPhoneNumber() : dto.getPhoneNumber())
                .birthDate(date)
                .height(dto.getHeight() == null ? member.getHeight() : dto.getHeight())
                .weight(dto.getWeight() == null ? member.getWeight() : dto.getWeight())
                .imageUrl(imageUrl)
                .build();
        memberRepository.save(member);
        // 이후 액세스 토큰 재발급
        PassportDto newPassport = PassportDto.builder()
                .id(member.getUuid())
                .name(member.getName())
                .nickname(member.getNickname())
                .email(member.getEmail())
                .imageUrl(member.getImageUrl())
                .role(Role.REGISTERED)
                .build();
        String newAccessToken = tokenProvider.generateAccessToken(newPassport);
        return UpdateMemberResponseDto.builder()
                .name(member.getName())
                .phoneNumber(member.getPhoneNumber())
                .birthDate(formatter.format(member.getBirthDate()))
                .height(member.getHeight())
                .weight(member.getWeight())
                .accessToken(newAccessToken)
                .imageUrl(member.getImageUrl())
                .build();
    }

    @Override
    public CheckRedundancyResponseDto checkRedundancy(CheckRedundancyRequestDto dto) {
        boolean duplicated = memberRepository.existsByNickname(dto.getNickname());
        return CheckRedundancyResponseDto.builder()
                .duplicated(duplicated)
                .build();
    }

    @Override
    public GetMemberInfoResponseDto getMyInfo(PassportDto passport) {
        Member member = memberRepository.findByEmail(passport.getEmail()).get();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
        formatter.setTimeZone(TimeZone.getTimeZone("Asia/Seoul"));
        String birthDate = formatter.format(member.getBirthDate());
        return GetMemberInfoResponseDto.builder()
                .nickname(member.getNickname())
                .height(member.getHeight())
                .weight(member.getWeight())
                .name(member.getName())
                .phoneNumber(member.getPhoneNumber())
                .email(member.getEmail())
                .address(member.getAddress())
                .birthDate(birthDate)
                .gender(member.getGender())
                .imageUrl(member.getImageUrl())
                .build();
    }
}
