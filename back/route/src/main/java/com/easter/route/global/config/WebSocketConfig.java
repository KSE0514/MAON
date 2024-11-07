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
		// 서버에서 클라이언트가 전송하는 메시지 받을 때
		config.setApplicationDestinationPrefixes("/pub");
		// 구독하고 있는 클라이언트한테 메시지 전달함 (@SendTo("/sub")
		config.enableSimpleBroker("/sub");
	}

	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		registry.addEndpoint("/ws/location").setAllowedOriginPatterns("*").withSockJS();
	}
}