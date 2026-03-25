package com.sportradar.events.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name = "goal_event")
@Getter @Setter @NoArgsConstructor
public class GoalEvent {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne @JoinColumn(name = "_result_id", nullable = false)
    private Result result;
    @ManyToOne @JoinColumn(name = "_team_id")
    private Team team;
    private String playerName;
    private Integer minute;
    private String goalType;
}