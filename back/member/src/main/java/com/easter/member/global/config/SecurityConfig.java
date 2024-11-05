package com.easter.member.global.config;

import com.easter.member.global.filter.PassportFilter;
import com.easter.member.global.security.handler.OAuth2SuccessHandler;
import com.easter.member.global.security.userinfo.CustomOidcUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.config.annotation.web.configurers.FormLoginConfigurer;
import org.springframework.security.config.annotation.web.configurers.HttpBasicConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.intercept.AuthorizationFilter;
import org.springframework.security.web.authentication.AuthenticationFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.context.NullSecurityContextRepository;

@Configuration
@EnableWebSecurity(debug = true)
@RequiredArgsConstructor
public class SecurityConfig {

    private final OAuth2SuccessHandler oAuth2SuccessHandler;
    private final CustomOidcUserService customOidcUserService;
//    private final PassportFilter passportFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(CsrfConfigurer::disable)
                .httpBasic(HttpBasicConfigurer::disable)
                .formLogin(FormLoginConfigurer::disable) // oauth를 위해 기본 로그인 비활성화
                .sessionManagement(c -> c.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // 세션 사용하지 않음
                .authorizeHttpRequests(request -> request // 인증 필터링은 gateway에서 시행하므로 여기에서는 permit all
                        .anyRequest().permitAll())
//                .securityContext(context -> context.securityContextRepository(new NullSecurityContextRepository()))
                // oauth
                .oauth2Login(oauth2 -> oauth2
                                .authorizationEndpoint(auth -> auth.baseUri("/maon/member/member/login"))
                                .redirectionEndpoint(redirect -> redirect.baseUri("/maon/member/login/oauth2/code/*"))
                                .userInfoEndpoint(userInfo -> userInfo.oidcUserService(customOidcUserService))
                                .successHandler(oAuth2SuccessHandler)
//                        .userInfoEndpoint(userInfo -> userInfo
//                                .userService(customOAuth2UserService) // 로그인 성공 후 사용자 정보 처리할 클래스 지정
//                                .oidcUserService(customOidcUserService)
//                        )
//                        .successHandler(successHandler) // 로그인 성공시 실행할 클래스 지정
//                        .failureHandler(failureHandler) // 로그인 실패시 실행할 클래스 지정
                )
                .addFilterAfter(new PassportFilter(), AuthorizationFilter.class)
        ;
        return http.build();
    }
}
