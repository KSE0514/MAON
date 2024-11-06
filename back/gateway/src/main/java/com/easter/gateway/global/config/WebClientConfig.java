package com.easter.gateway.global.config;

import io.netty.channel.ChannelOption;
import io.netty.handler.timeout.ReadTimeoutHandler;
import io.netty.handler.timeout.WriteTimeoutHandler;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.client.ExchangeFilterFunction;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import reactor.netty.http.client.HttpClient;

import java.util.concurrent.TimeUnit;

@Configuration
@Slf4j
public class WebClientConfig {

    @Value("${external-url.member}")
    private String memberUrl;

    @Bean
    public WebClient webClient() {
        // timeout 관련 설정 삽입
        HttpClient httpClient = HttpClient.create()
                .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, 5000)
                .doOnConnected(con -> con
                        .addHandlerLast(new ReadTimeoutHandler(5000, TimeUnit.MILLISECONDS))
                        .addHandlerLast(new WriteTimeoutHandler(5000, TimeUnit.MILLISECONDS)
                        )
                );
        WebClient webClient = WebClient.builder()
                .baseUrl(memberUrl)
                .clientConnector(new ReactorClientHttpConnector(httpClient))
                //Request Header 로깅 필터
                .filter(
                        ExchangeFilterFunction.ofRequestProcessor(
                                clientRequest -> {
                                    log.info(">>>>>>>>> REQUEST <<<<<<<<<<");
                                    log.info("Request: {} {}", clientRequest.method(), clientRequest.url());
                                    clientRequest.headers().forEach(
                                            (name, values) -> values.forEach(value -> log.info("{} : {}", name, value))
                                    );
                                    return Mono.just(clientRequest);
                                }
                        )
                )
                //Response Header 로깅 필터
                .filter(
                        ExchangeFilterFunction.ofResponseProcessor(
                                clientResponse -> {
                                    log.info(">>>>>>>>>> RESPONSE <<<<<<<<<<");
                                    clientResponse.headers().asHttpHeaders().forEach(
                                            (name, values) -> values.forEach(value -> log.info("{} {}", name, value))
                                    );
                                    return Mono.just(clientResponse);
                                }
                        )
                )
                .defaultHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8") //기본 헤더설정
                .build();
        return webClient;
    }
}
