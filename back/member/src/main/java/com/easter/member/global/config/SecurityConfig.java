package com.easter.member.global.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.config.annotation.web.configurers.FormLoginConfigurer;
import org.springframework.security.config.annotation.web.configurers.HttpBasicConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsUtils;

@Configuration
@Order(1)
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(CsrfConfigurer::disable)
                .httpBasic(HttpBasicConfigurer::disable)
                .formLogin(FormLoginConfigurer::disable) // oauth를 위해 기본 로그인 비활성화
                .authorizeHttpRequests(request -> request // 인증 설정
                        .requestMatchers(CorsUtils::isPreFlightRequest).permitAll()
                        .requestMatchers("/free").permitAll()
                        .anyRequest().permitAll())
                // oauth
                .oauth2Login(oauth2 -> oauth2
                                .authorizationEndpoint(auth -> auth.baseUri("/maon/member/member/login"))
//                        .userInfoEndpoint(userInfo -> userInfo
//                                .userService(customOAuth2UserService) // 로그인 성공 후 사용자 정보 처리할 클래스 지정
//                                .oidcUserService(customOidcUserService)
//                        )
//                        .successHandler(successHandler) // 로그인 성공시 실행할 클래스 지정
//                        .failureHandler(failureHandler) // 로그인 실패시 실행할 클래스 지정
                )
        ;
        return http.build();
    }
}
