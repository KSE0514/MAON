package com.easter.member.global.security.jwt;

import com.easter.member.global.security.userinfo.CustomOidcUser;
import com.easter.member.global.security.userinfo.PassportDto;
import com.easter.member.global.security.userinfo.TokenType;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SecureDigestAlgorithm;
import io.jsonwebtoken.security.SignatureAlgorithm;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.concurrent.TimeUnit;

//@RequiredArgsConstructor
@Component
@Slf4j
public class TokenProvider {
    @Value("${spring.jwt.secret}")
    private String key;

    @Value("${spring.jwt.token.access-expiration-time}")
    private long accessExpirationTime;

    @Value("${spring.jwt.token.refresh-expiration-time}")
    private long refreshExpirationTime;

    private SecretKey secretKey;

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    @PostConstruct
    private void setSecretKey() {
        secretKey = Keys.hmacShaKeyFor(key.getBytes());
    }

    private String generateToken(PassportDto passport, long expireTime, TokenType type) {
        Date now = new Date();
        Date expiredDate = new Date(now.getTime() + expireTime);

        log.info("passport : {}", passport.toString());
        String generatedToken = Jwts.builder()
//                .subject(authentication.getName())
                .claim("type", type.name())
                .claim("email", passport.getEmail())
                .claim("name", passport.getName())
                .claim("image_url", passport.getImageUrl())
                .claim("role", passport.getRole().name())
                .issuedAt(now)
                .expiration(expiredDate)
                .signWith(secretKey, Jwts.SIG.HS512)
                .compact();
        // 토큰 생성 후 redis에 저장
        String redisKey = type.name()+":" + passport.getEmail();
        redisTemplate.opsForValue().set(
                redisKey,
                generatedToken,
                expireTime,
                TimeUnit.MILLISECONDS
        );
        return generatedToken;
    }

    public String generateAccessToken(PassportDto passport) {
        return generateToken(passport, accessExpirationTime, TokenType.ACCESS);
    }

    public String generateRefreshToken(PassportDto passport) {
        return generateToken(passport, refreshExpirationTime, TokenType.REFRESH);
    }

    public String getTokenByEmail(String email, TokenType type) {
        return redisTemplate.opsForValue().get(type.name() + ":" + email);
    }

    public Claims decode(String token) {
        // todo : 각종 exception 처리
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload();
    }

    public boolean removeToken(String email) {
        // refresh, access 전부 제거
        return redisTemplate.delete(TokenType.ACCESS.name() + ":" + email) && redisTemplate.delete(TokenType.REFRESH.name() + ":" + email);
    }

}
