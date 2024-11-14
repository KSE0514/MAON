package com.easter.route.domain.connection.service;

import com.easter.route.domain.connection.model.ConnectionType;
import com.easter.route.domain.connection.model.dto.ConnectionTestDto;
import com.easter.route.domain.connection.model.dto.MemberInfoDto;
import com.easter.route.domain.connection.model.dto.RelayMemberInfoDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@Slf4j
public class ConnectionServiceImpl implements ConnectionService {

    private final RedisTemplate<String, String> redisTemplate;
    private final String CODE_PREFIX = "CONNECTION_CODE:";

    @Override
    public void saveMemberInfo(MemberInfoDto dto, String code) {
        ValueOperations<String, String> ops = redisTemplate.opsForValue();
        String key = CODE_PREFIX + code;
        if(ops.get(key) != null) {
            log.error("already exist : {}", code);
            return;
        }
        ops.set(key, dto.getMemberId().toString());
        redisTemplate.expire(key, 10, TimeUnit.MINUTES); // 코드의 유효기간은 10분
    }

    @Override
    public ConnectionTestDto connectionTest(String code) {
        return ConnectionTestDto.builder().type(ConnectionType.CONNECTION_TEST).timestamp(LocalDateTime.now()).build();
    }

    @Override
    public RelayMemberInfoDto relayMemberInfo(String code) {
        ValueOperations<String, String> ops = redisTemplate.opsForValue();
        String key = CODE_PREFIX + code;
        String memberId = ops.get(key);
        if(memberId == null) {
            log.error("cannot find member : {}", code);
            return null;
        }
        return RelayMemberInfoDto.builder()
                .type(ConnectionType.SENDING_INFORMATION)
                .memberId(UUID.fromString(memberId))
                .timestamp(LocalDateTime.now())
                .build();
    }
}
