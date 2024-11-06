package com.easter.route.domain.route.controller;

import com.easter.route.domain.route.service.RouteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Controller
@MessageMapping("/topic")
@RequiredArgsConstructor
@Slf4j
public class RouteStompController {
    private final RouteService routeService;
}
