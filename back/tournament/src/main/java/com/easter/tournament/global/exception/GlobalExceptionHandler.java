package com.easter.tournament.global.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BusinessException.class)
    protected ResponseEntity<com.easter.member.global.exception.ErrorResponse> handleBusinessException(BusinessException ex) {
        com.easter.member.global.exception.ErrorResponse errorResponse = com.easter.member.global.exception.ErrorResponse.of(ex.getStatus(), ex.getMessage());
        return ResponseEntity.status(errorResponse.getStatus()).body(errorResponse);
    }

    @ExceptionHandler(Exception.class)
    protected ResponseEntity<com.easter.member.global.exception.ErrorResponse> handleException(Exception ex) {
        ex.printStackTrace();
        com.easter.member.global.exception.ErrorResponse errorResponse = com.easter.member.global.exception.ErrorResponse.of(HttpStatus.INTERNAL_SERVER_ERROR, "서버에서 오류가 발생했습니다.");
        return ResponseEntity.status(errorResponse.getStatus()).body(errorResponse);
    }

}
