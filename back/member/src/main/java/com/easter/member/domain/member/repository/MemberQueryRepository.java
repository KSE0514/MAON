package com.easter.member.domain.member.repository;

import com.easter.member.domain.member.entity.QMember;
import com.easter.member.domain.service.model.dto.MemberDto;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
@RequiredArgsConstructor
public class MemberQueryRepository {
    private final JPAQueryFactory queryFactory;
    public List<MemberDto> findMemberInfoByUuid(List<UUID> idList) {
        QMember member = QMember.member;
        return queryFactory.select(Projections.constructor(MemberDto.class, member.uuid, member.name, member.nickname, member.email, member.imageUrl))
                .from(member)
                .where(fromIdList(idList))
                .fetch();
    }

    private BooleanBuilder fromIdList(List<UUID> idList) {
        BooleanBuilder builder = new BooleanBuilder();
        for (UUID uuid : idList) {
            builder.or(QMember.member.uuid.eq(uuid));
        }
        return builder;
    }
}
