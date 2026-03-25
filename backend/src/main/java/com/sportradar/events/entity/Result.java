@Entity @Table(name = "result")
@Getter @Setter @NoArgsConstructor
public class Result {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @OneToOne @JoinColumn(name = "_event_id", nullable = false, unique = true)
    private Event event;
    @ManyToOne @JoinColumn(name = "_winner_team_id")
    private Team winnerTeam;
    private String message;
}