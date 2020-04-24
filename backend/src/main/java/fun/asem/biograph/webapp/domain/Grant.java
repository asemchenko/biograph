package fun.asem.biograph.webapp.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "grants")
@Data
@Builder
public class Grant {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long grantId;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    private Long eventId;
    @Enumerated(EnumType.STRING)
    private AccessType accessType;

    public enum AccessType {
        READ_ONLY,
        EDIT,
        OWNER
    }
}
