package com.easter.route.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

	@Override
	public void configureMessageBroker(MessageBrokerRegistry config) {
		// 클라이언트가 보낸 메시지 받는 prefix
		config.setApplicationDestinationPrefixes("/app");
		// 구독자가 queue, topic 구독하도록 설정
		config.enableSimpleBroker("/topic");
	}

	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		registry.addEndpoint("/ws/").setAllowedOrigins("*").withSockJS();
	}
}
