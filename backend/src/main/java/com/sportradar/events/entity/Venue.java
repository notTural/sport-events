package com.sportradar.events.entity;

@Entity @Table(name = "venue")
@Getter @Setter @NoArgsConstructor
public class Venue {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false)
    private String name;
    private String city;
    private Integer capacity;
    @ManyToOne @JoinColumn(name = "_country_code")
    private Country country;
}