package fun.asem.biograph.webapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Formula;

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
    private String name;
    private String description;
    private String color;
    private Instant creationTime;
    @ManyToMany
    @JoinTable(
            name = "category_attributes",
            joinColumns = {@JoinColumn(name = "category_id")},
            inverseJoinColumns = {@JoinColumn(name = "attribute_id")}
    )
    private List<Attribute> attributes;
    @JsonIgnore
    @OneToMany(
            cascade = CascadeType.ALL,
            mappedBy = "category",
            fetch = FetchType.LAZY)
    private List<Grant> grants;
    @Formula("( SELECT COUNT(*) FROM events WHERE events.category_id = category_id )")
    private Long totalEvents;
}
