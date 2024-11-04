package com.easter.gateway.global.security;

import com.easter.gateway.global.exception.JwtException;
import com.easter.gateway.global.model.ConfirmMemberResponseDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authorization.AuthorizationDecision;
import org.springframework.security.authorization.AuthorizationManager;
import org.springframework.security.authorization.ReactiveAuthorizationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.server.authorization.AuthorizationContext;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.Date;
import java.util.Map;
import java.util.function.Supplier;

@Slf4j
@Component
@RequiredArgsConstructor
public class CustomAuthorizationManager implements ReactiveAuthorizationManager<AuthorizationContext> {

    private final TokenProvider tokenProvider;
    private final ObjectMapper objectMapper;
    private final RestClient restClient;
    private final String PREFIX = "ROLE_";

    @Override
    public Mono<AuthorizationDecision> check(Mono supplier, AuthorizationContext context) {
        ServerWebExchange exchange = context.getExchange();
        log.info("jwt custom authorization manager entered");
        String token = tokenProvider.getJwtTokenFromRequestHeader(exchange);
        if(token == null) {
            log.info("this request has no token");
            return Mono.just(new AuthorizationDecision(false));
        }
        Claims claims = tokenProvider.decode(token);
        String email = (String) claims.get("email");
        // 찾을 수 있었다면, passportDto에 들어갈 정보 수령
        // todo : member쪽에 쿼리해와서 passportDto 생성
        ResponseEntity<Map> passportResult = restClient.get()
                .uri("/member/confirm/" + email)
                .retrieve()
                .toEntity(Map.class);
        ConfirmMemberResponseDto responseDto = objectMapper.convertValue(passportResult.getBody().get("data"), ConfirmMemberResponseDto.class);
        PassportDto passport = responseDto.getPassport();
        if(responseDto.isRegistered()) {
            passport.setRole(Role.REGISTERED);
        } else {
            passport.setRole(Role.UNREGISTERED);
            passport.setName((String) claims.get("name"));
            passport.setEmail(email);
            passport.setImageUrl((String) claims.get("image_url"));
        }
        log.info("passport created : {}", passport.toString());
        if(!claims.getExpiration().after(new Date())) { // 토큰이 만료된거였다면 재발급 진행
            String reissueAccessToken = tokenProvider.reissueAccessToken(passport);
            if(reissueAccessToken == null) {
                log.error("there is no refresh token : {}", email);
                throw new JwtException(HttpStatus.UNAUTHORIZED, "there is no refresh token"); // todo : refresh가 없는 access token인 경우 redis에서 데이터 삭제, 로그아웃 처리
            }
        }
        // todo : header에 passport 정보 삽입
        return Mono.just(new AuthorizationDecision(true));

//        Authentication auth = (Authentication) supplier.block();
//        if (auth != null) {
//            User user = (User) auth.getPrincipal();
//            if (user == null) {
//                return Mono.just(new AuthorizationDecision(false));
//            }
//            if (user.getAuthorities().contains(new SimpleGrantedAuthority(PREFIX + Role.REGISTERED.name()))) {
//                log.debug("check done : User {} is registered", user.getUsername());
//                return Mono.just(new AuthorizationDecision(true));
//            } else if(user.getAuthorities().contains(new SimpleGrantedAuthority(PREFIX + Role.UNREGISTERED.name()))) {
//                log.debug("check done : User {} is unregistered", user.getUsername());
//                return Mono.just(new AuthorizationDecision(true));
//            } else {
//                log.debug("check error : invalid role {}", user.getAuthorities());
//                return Mono.just(new AuthorizationDecision(false));
//            }
//        }
//        return Mono.just(new AuthorizationDecision(false));
    }
}
