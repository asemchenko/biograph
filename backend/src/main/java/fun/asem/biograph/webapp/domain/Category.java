package fun.asem.biograph.webapp.domain;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "categoryId")
    private List<Grant> grants;

    @JsonGetter("totalEvents")
    private Long getTotalEvents() {
        return 0L;
    }
}
