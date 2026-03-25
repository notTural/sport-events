@Entity @Table(name = "event")
@Getter @Setter @NoArgsConstructor
public class Event {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false)
    private Integer season;
    @Column(name = "date_venue", nullable = false)
    private LocalDate dateVenue;
    @Column(name = "time_venue_utc")
    private LocalTime timeVenueUtc;
    @Column(nullable = false)
    private String status;

    @ManyToOne @JoinColumn(name = "_competition_id", nullable = false)
    private Competition competition;
    @ManyToOne @JoinColumn(name = "_stage_id", nullable = false)
    private Stage stage;
    @ManyToOne @JoinColumn(name = "_group_id")
    private GroupTable group;
    @ManyToOne @JoinColumn(name = "_home_team_id")
    private Team homeTeam;
    @ManyToOne @JoinColumn(name = "_away_team_id")
    private Team awayTeam;
    @ManyToOne @JoinColumn(name = "_venue_id")
    private Venue venue;
}