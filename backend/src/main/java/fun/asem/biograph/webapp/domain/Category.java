package fun.asem.biograph.webapp.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.Instant;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "categories")
@Data
@Builder
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long categoryId;
    /**
     * Stores:
     * <ul>
     *     <li><b>name</b> - the name of category</li>
     *     <li><b>color</b> - user can assign custom color to category</li>
     * </ul>
     */
    @OneToOne
    @JoinColumn(name = "sensitive_record_id")
    private SensitiveRecord data;
    private Instant creationTime;
    @ManyToMany
    @JoinTable(
            name = "category_attributes",
            joinColumns = {@JoinColumn(name = "category_id")},
            inverseJoinColumns = {@JoinColumn(name = "attribute_id")}
    )
    private List<Attribute> attributes;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "categoryId")
    private List<Grant> grants;
}
