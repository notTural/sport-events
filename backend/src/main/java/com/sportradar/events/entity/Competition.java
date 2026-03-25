package com.sportradar.events.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name = "competition")
@Getter @Setter @NoArgsConstructor
public class Competition {
    @Id
    private String id;
    @Column(nullable = false)
    private String name;
}