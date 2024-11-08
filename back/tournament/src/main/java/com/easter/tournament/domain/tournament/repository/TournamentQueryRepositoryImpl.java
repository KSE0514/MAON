package com.easter.tournament.domain.tournament.repository;

import com.easter.tournament.domain.tournament.entity.QTournament;
import com.easter.tournament.domain.tournament.entity.Tournament;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.querydsl.core.types.dsl.Expressions.numberTemplate;

@Repository
@AllArgsConstructor
@Slf4j
public class TournamentQueryRepositoryImpl implements TournamentQueryRepository {
    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<Tournament> findByYearAndMonth(Integer year, Integer month, Integer areaCodeId) {
        QTournament tournament = QTournament.tournament;
        BooleanBuilder builder = new BooleanBuilder();

        log.info("year : {}, month : {}, areaCodeId : {}" ,year, month, areaCodeId);

        // 1. 년도로만 검색
        if (year != 0 && month == 0 && areaCodeId == 0) {
            builder.and(year(tournament.tournamentDayStart).eq(year));
        }
        // 2. 년도, 월로 검색
        else if (year != 0 && month != 0 && areaCodeId == 0) {
            builder.and(year(tournament.tournamentDayStart).eq(year))
                    .and(month(tournament.tournamentDayStart).eq(month));
        }
        // 3. 년도, 장소 검색
        else if (year != 0 && month == 0 && areaCodeId != 0) {
            builder.and(year(tournament.tournamentDayStart).eq(year))
                    .and(tournament.areaCode.id.eq(areaCodeId.longValue())); // areaCodeId를 Long으로 변환하여 비교
        }
        // 4. 년도, 월, 장소 검색
        else if (year != 0 && month != 0 && areaCodeId != 0) {
            builder.and(year(tournament.tournamentDayStart).eq(year))
                    .and(month(tournament.tournamentDayStart).eq(month))
                    .and(tournament.areaCode.id.eq(areaCodeId.longValue()));
        }
        // 5. 장소로만 검색
        else if (year == 0 && month == 0 && areaCodeId != 0) {
            builder.and(tournament.areaCode.id.eq(areaCodeId.longValue()));
        }

        return jpaQueryFactory
                .selectFrom(tournament)
                .where(builder)
                .orderBy(tournament.tournamentDayStart.asc())
                .fetch();
    }

    // QueryDSL에서 LocalDateTime의 year 추출
    private static com.querydsl.core.types.dsl.NumberExpression<Integer> year(com.querydsl.core.types.dsl.DateTimePath<java.time.LocalDateTime> dateTimePath) {
        return numberTemplate(Integer.class, "YEAR({0})", dateTimePath);
    }

    // QueryDSL에서 LocalDateTime의 month 추출
    private static com.querydsl.core.types.dsl.NumberExpression<Integer> month(com.querydsl.core.types.dsl.DateTimePath<java.time.LocalDateTime> dateTimePath) {
        return numberTemplate(Integer.class, "MONTH({0})", dateTimePath);
    }
}
