package com.easter.gateway.global.filter;

import com.easter.gateway.global.exception.BusinessException;
import com.easter.gateway.global.model.ConfirmMemberResponseDto;
import com.easter.gateway.global.security.PassportDto;
import com.easter.gateway.global.security.Role;
import com.easter.gateway.global.security.TokenProvider;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.security.authorization.AuthorizationDecision;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

import java.util.Base64;
import java.util.Date;
import java.util.Map;
import java.util.function.Consumer;

@Slf4j
@Component
@RequiredArgsConstructor
public class PassportFilter implements WebFilter {

    private final TokenProvider tokenProvider;
    private final ObjectMapper objectMapper;
    private final RestClient restClient;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        log.info("jwt passport manager entered");
        if(exchange.getRequest().getHeaders().containsKey("passport")) {
            return chain.filter(exchange);
        }
        String token = tokenProvider.getJwtTokenFromRequestHeader(exchange);
        if (token == null) {
            log.info("this request has no token");
            return chain.filter(exchange); // 토큰이 없으므로 그대로 다음 필터로 진행
        }
        Claims claims = tokenProvider.decode(token);
        if (!claims.getExpiration().after(new Date())) { // 토큰 만료여부 체크
            throw new BusinessException(HttpStatus.UNAUTHORIZED, "토큰이 만료되었습니다. 재발급해주세요.");
        }
        String email = (String) claims.get("email");
        // 찾을 수 있었다면, passportDto에 들어갈 정보 수령
        ResponseEntity<Map> passportResult = restClient.get()
                .uri(uriBuilder -> uriBuilder.path("/service/confirm/" + email).queryParam("token", token).build())
                .retrieve()
                .onStatus(HttpStatusCode::is4xxClientError, (request, response) -> {
                    throw new BusinessException(HttpStatus.INTERNAL_SERVER_ERROR, "응답 실패");
                })
                .toEntity(Map.class);
        ConfirmMemberResponseDto responseDto = objectMapper.convertValue(passportResult.getBody().get("data"), ConfirmMemberResponseDto.class);
        if(!responseDto.isValid()) {
            log.info("invalid token");
            return chain.filter(exchange);
        }
        PassportDto passport = responseDto.getPassport();
        if (responseDto.isRegistered()) {
            passport.setRole(Role.REGISTERED);
        } else {
            passport.setRole(Role.UNREGISTERED);
            passport.setName((String) claims.get("name"));
            passport.setEmail(email);
            passport.setImageUrl((String) claims.get("image_url"));
        }
        log.info("passport created : {}", passport.toString());
        Map<String, String> passportMap = objectMapper.convertValue(passport, Map.class);
        Base64.Encoder encoder = Base64.getEncoder();
        Consumer<HttpHeaders> headersConsumer = httpHeaders -> {
            for(Map.Entry<String, String> entry : passportMap.entrySet()) {
                if(entry.getValue() != null) {
                    httpHeaders.add(entry.getKey(), encoder.encodeToString(entry.getValue().getBytes()));
                }
            }
            httpHeaders.add("passport", "confirmed");
        };
        ServerWebExchange newExchange = exchange
                .mutate()
                .request(exchange
                        .getRequest()
                        .mutate()
                        .headers(headersConsumer)
                        .build())
                .build();
        return chain.filter(newExchange);
    }
}
