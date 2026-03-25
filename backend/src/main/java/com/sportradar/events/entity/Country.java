package com.sportradar.events.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name = "country")
@Getter @Setter @NoArgsConstructor
public class Country {
    @Id
    @Column(length = 3)
    private String code;
    private String name;
}