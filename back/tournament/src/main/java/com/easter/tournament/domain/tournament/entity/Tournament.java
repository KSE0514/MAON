package com.easter.tournament.domain.tournament.entity;

import com.easter.tournament.domain.participant.entity.Participant;
import com.fasterxml.uuid.Generators;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.ws.rs.DefaultValue;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Builder(toBuilder = true)
@Table(name = "tournament")
@NoArgsConstructor
@AllArgsConstructor
public class Tournament {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @NotNull
    @Column(name = "uuid", columnDefinition = "binary(16)")
    private UUID uuid;

    @NotNull
    @Column(name = "title")
    private String title;

    @NotNull
    @Column(name = "category")
    private String category;

    @NotNull
    @Column(name = "location")
    private String location;

    @NotNull
    @Column(name = "tournament_day")
    private LocalDateTime tournamentDay;

    @NotNull
    @Column(name = "closed")
    @DefaultValue(value = "false")
    private boolean closed;

    @NotNull
    @Column(name = "ended")
    @DefaultValue(value = "false")
    private boolean ended;

    @Column(name = "homepage")
    private boolean homepage;

    @Column(name = "receipt_start")
    private LocalDateTime receiptStart;

    @Column(name = "receipt_end")
    private LocalDateTime receiptEnd;

    @Column(name = "host")
    private String host;

    @OneToMany(mappedBy = "tournament", fetch = FetchType.LAZY)
    private List<TournamentAssignment> tournamentAssignment;

    @OneToMany(mappedBy = "tournament", fetch = FetchType.LAZY)
    private List<Participant> participants;

    @PrePersist
    private void prePersist() {
        this.uuid = Generators.timeBasedEpochGenerator().generate();
    }
}
