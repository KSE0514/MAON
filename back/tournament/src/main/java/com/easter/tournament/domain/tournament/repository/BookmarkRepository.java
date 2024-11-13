package com.easter.tournament.domain.tournament.repository;

import com.easter.tournament.domain.tournament.entity.TournamentBookmark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookmarkRepository extends JpaRepository<TournamentBookmark, Long> {
    <S extends TournamentBookmark> S save(S entity);
    void delete(TournamentBookmark entity);
}
