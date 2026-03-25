@Entity @Table(name = "stage")
@Getter @Setter @NoArgsConstructor
public class Stage {
    @Id
    private String id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private Integer ordering;
}