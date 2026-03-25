package com.sportradar.events.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name = "team")
@Getter @Setter @NoArgsConstructor
public class Team {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false, unique = true)
    private String slug;
    @Column(nullable = false)
    private String name;
    @Column(name = "official_name", nullable = false)
    private String officialName;
    @Column(nullable = false, length = 3)
    private String abbreviation;
    private Integer foundedYear;
    @ManyToOne @JoinColumn(name = "_country_code", nullable = false)
    private Country country;
}