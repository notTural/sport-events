package com.sportradar.events.entity;

@Entity @Table(name = "competition")
@Getter @Setter @NoArgsConstructor
public class Competition {
    @Id
    private String id;
    @Column(nullable = false)
    private String name;
}