package com.easter.gateway.global.security;

import com.easter.gateway.global.exception.JwtException;
import com.easter.gateway.global.model.ConfirmMemberResponseDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authorization.AuthorizationDecision;
import org.springframework.security.authorization.ReactiveAuthorizationManager;
import org.springframework.security.web.server.authorization.AuthorizationContext;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.client.RestClient;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Slf4j
@Component
@RequiredArgsConstructor
public class CustomAuthorizationManager implements ReactiveAuthorizationManager<AuthorizationContext> {

    private final TokenProvider tokenProvider;
    private final ObjectMapper objectMapper;
    private final RestClient restClient;
    private final RedisTemplate<String, String> redisTemplate;

    @Override
    public Mono<AuthorizationDecision> check(Mono supplier, AuthorizationContext context) { // 헤더 뜯어서 값 존재하는지만 검사
        ServerWebExchange exchange = context.getExchange();
        log.info("jwt custom authorization manager entered");
//        for(String value : exchange.getRequest().getHeaders().keySet()) {
//            log.info(exchange.getRequest().getHeaders().getFirst(value));
//        }
        HttpHeaders headers = exchange.getRequest().getHeaders();
        if(headers.containsKey(HttpHeaders.AUTHORIZATION) && headers.containsKey("passport")) {
            log.debug("valid jwt : {}", headers.get(HttpHeaders.AUTHORIZATION));
            return Mono.just(new AuthorizationDecision(true));
        } else {
            log.error("invalid request -> Access Denied");
            return Mono.just(new AuthorizationDecision(false));
        }

    }
}
