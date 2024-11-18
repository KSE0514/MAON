package com.easter.member.domain.member.repository;

import com.easter.member.domain.member.entity.QMember;
import com.easter.member.domain.service.model.dto.MemberDto;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.UUID;

@Repository
@RequiredArgsConstructor
public class MemberQueryRepository {
    private final JPAQueryFactory queryFactory;
    private final QMember member = QMember.member;
    // public List<MemberDto> findMemberInfoByUuid(List<UUID> idList, String nicknameKeyword) {
    //     return queryFactory.select(Projections.constructor(MemberDto.class, member.uuid, member.name, member.nickname, member.email, member.imageUrl))
    //             .from(member)
    //             .where(fromIdList(idList), nicknameKeyword(nicknameKeyword))
    //             .fetch();
    // }
    public List<MemberDto> findMemberInfoByUuid(List<UUID> idList, String nicknameKeyword) {
        return queryFactory
            .select(Projections.constructor(MemberDto.class,
                member.uuid,
                member.name,
                member.nickname,
                member.email,
                member.imageUrl))
            .from(member)
            .where(
                idListCondition(idList),
                nicknameCondition(nicknameKeyword)
            )
            .fetch();
    }

    // null 체크를 포함한 ID 리스트 조건
    private BooleanExpression idListCondition(List<UUID> idList) {
        return idList != null && !idList.isEmpty() ? member.uuid.in(idList) : null;
    }

    // null 체크를 포함한 닉네임 검색 조건
    private BooleanExpression nicknameCondition(String nicknameKeyword) {
        return StringUtils.hasText(nicknameKeyword) ?
            member.nickname.containsIgnoreCase(nicknameKeyword) : null;
    }

    private BooleanBuilder fromIdList(List<UUID> idList) {
        BooleanBuilder builder = new BooleanBuilder();
        for (UUID uuid : idList) {
            builder.or(member.uuid.eq(uuid));
        }
        return builder;
    }

    private BooleanExpression nicknameKeyword(String nicknameKeyword) {
        if(nicknameKeyword == null || nicknameKeyword.isEmpty()) {
            return null;
        }
        return member.nickname.contains(nicknameKeyword);
    }
}
