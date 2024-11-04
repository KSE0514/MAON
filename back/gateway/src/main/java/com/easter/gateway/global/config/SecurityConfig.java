package com.easter.gateway.global.config;
import com.easter.gateway.global.filter.PassportFilter;
import com.easter.gateway.global.security.CustomAuthorizationManager;
import com.easter.gateway.global.security.NotAuthorizedServerEntryPoint;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.context.NoOpServerSecurityContextRepository;
import org.springframework.security.web.server.util.matcher.PathPatternParserServerWebExchangeMatcher;

@Configuration
@EnableWebFluxSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final CustomAuthorizationManager customAuthorizationManager;
    private final PassportFilter passportFilter;

    @Bean
    public SecurityWebFilterChain filterChain(ServerHttpSecurity http) throws Exception {
        http
                .securityMatcher(new PathPatternParserServerWebExchangeMatcher("/maon/**"))
                .csrf(ServerHttpSecurity.CsrfSpec::disable)
                .formLogin(ServerHttpSecurity.FormLoginSpec::disable)
                .httpBasic(ServerHttpSecurity.HttpBasicSpec::disable) // oauth를 위해 기본 로그인 비활성화
                .authorizeExchange(exchanges -> exchanges
                        .pathMatchers("/favicon.ico", "/error").permitAll()
                        .pathMatchers("/maon/member/member/login/**", "/maon/member/login/**","/maon/member/member/oauth2/**").permitAll()
                        .pathMatchers("/maon/member/**").access(customAuthorizationManager)
                        .anyExchange().permitAll()
                )
                .securityContextRepository(NoOpServerSecurityContextRepository.getInstance())
//                .securityContextRepository(redisConnectionFactory)
                .exceptionHandling(ex -> ex.authenticationEntryPoint(new NotAuthorizedServerEntryPoint()))
                .addFilterBefore(passportFilter, SecurityWebFiltersOrder.AUTHORIZATION)
//                .addFilterBefore(jwtAuthenticationFilter, SecurityWebFiltersOrder.AUTHENTICATION)
        ;
        return http.build();
    }
}
