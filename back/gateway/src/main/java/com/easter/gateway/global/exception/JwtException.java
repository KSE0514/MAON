package com.easter.gateway.global.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class JwtException extends RuntimeException{
    private final HttpStatus status;
    public JwtException (HttpStatus status, String message) {
        super(message);
        this.status = status;
    }
}
