package fun.asem.biograph.webapp.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * Grant can be issued to the next objects:
 * <ul>
 *     <li>Event</li>
 *     <li>Category</li>
 *     <li>Tag</li>
 * </ul>
 * One grant can not give access to more than one object
 * <br>
 * If such logic is required - each object must have own grant
 */
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
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "event_id")
    private Event event;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "tag_id")
    private Tag tag;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id")
    private Category category;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "attribute_id")
    private Attribute attribute;
    @Enumerated(EnumType.STRING)
    private AccessType accessType;

    /**
     * encryptedAccessKey = AES(accessKey, Argon2(user's password))
     * accessKey - key, that is used to decrypt sensitive data of associated with this grant object
     */
    /* private String encryptedAccessKey;*/

    public enum AccessType {
        READ_ONLY,
        EDIT,
        OWNER
    }
}
