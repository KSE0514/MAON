package com.easter.member.domain.challenge.entity;

import com.easter.member.domain.member.entity.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder(toBuilder = true)
@Table(name = "challenge_progress")
@DynamicInsert
@NoArgsConstructor
@AllArgsConstructor
public class ChallengeProgress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", insertable = false, updatable = false)
    private Member member;

    @NotNull
    @Column(name = "member_id")
    private Long memberId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "challenge_id", insertable = false, updatable = false)
    private Challenge challenge;

    @NotNull
    @Column(name = "challenge_id")
    private Long challengeId;

    @Column(name = "level")
    private Integer level;

    @ColumnDefault("false")
    @Column(name = "completed", columnDefinition = "tinyint(1)")
    private Boolean completed;

    @ColumnDefault("0")
    @Column(name = "progress", columnDefinition = "decimal(5, 2)")
    private Double progress;

    @Column(name = "completed_time")
    private LocalDateTime completedTime;
}
