@Entity @Table(name = "group_table")
@Getter @Setter @NoArgsConstructor
public class GroupTable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false)
    private String name;
    @ManyToOne @JoinColumn(name = "_stage_id", nullable = false)
    private Stage stage;
}