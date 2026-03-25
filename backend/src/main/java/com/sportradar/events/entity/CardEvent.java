package com.sportradar.events.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name = "card_event")
@Getter @Setter @NoArgsConstructor
public class CardEvent {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne @JoinColumn(name = "_result_id", nullable = false)
    private Result result;
    @ManyToOne @JoinColumn(name = "_team_id")
    private Team team;
    private String playerName;
    private Integer minute;
    @Column(nullable = false)
    private String cardType;
}
