//package com.easter.gateway.global.config;
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.Customizer;
//import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
//import org.springframework.security.config.web.server.ServerHttpSecurity;
//import org.springframework.security.web.server.SecurityWebFilterChain;
//import org.springframework.security.web.server.util.matcher.PathPatternParserServerWebExchangeMatcher;
//
//@Configuration
//@EnableWebFluxSecurity
//@RequiredArgsConstructor
//public class SecurityConfig {
//    @Bean
//    public SecurityWebFilterChain filterChain(ServerHttpSecurity http) throws Exception {
//        http
//                .securityMatcher(new PathPatternParserServerWebExchangeMatcher("/maon/**"))
//                .csrf(ServerHttpSecurity.CsrfSpec::disable)
//                .formLogin(ServerHttpSecurity.FormLoginSpec::disable)
//                .httpBasic(ServerHttpSecurity.HttpBasicSpec::disable) // oauth를 위해 기본 로그인 비활성화
//                .authorizeExchange(exchanges -> exchanges
//                        .pathMatchers("/maon/member/**").permitAll()
//                        .anyExchange().permitAll()
//                )
//                .oauth2Login(Customizer.withDefaults())
////                .authorizeHttpRequests(request -> request // 인증 설정
////                        .securityMatchers(CorsUtils::isPreFlightRequest).permitAll()
////                        .requestMatchers("/maon/member/**").permitAll()
////                        .anyRequest().permitAll())
////                // oauth
////                .oauth2Login(oauth2 -> oauth2
////                                .authorizationEndpoint(auth -> auth.baseUri("/maon/member/login"))
////                        .userInfoEndpoint(userInfo -> userInfo
////                                .userService(customOAuth2UserService) // 로그인 성공 후 사용자 정보 처리할 클래스 지정
////                                .oidcUserService(customOidcUserService)
////                        )
////                        .successHandler(successHandler) // 로그인 성공시 실행할 클래스 지정
////                        .failureHandler(failureHandler) // 로그인 실패시 실행할 클래스 지정
////                )
//        ;
//        return http.build();
//    }
//}
