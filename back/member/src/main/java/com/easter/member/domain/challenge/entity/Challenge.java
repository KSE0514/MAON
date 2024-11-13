package com.easter.member.domain.challenge.entity;

import com.easter.member.domain.challenge.model.dto.ChallengeType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder(toBuilder = true)
@Table(name = "challenge")
@NoArgsConstructor
@AllArgsConstructor
public class Challenge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "level")
    private int level;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private ChallengeType type;

    @Column(name = "amount", columnDefinition = "decimal(5, 2)")
    private double amount;

    @Column(name = "detail", length = 100)
    private String detail;

}
