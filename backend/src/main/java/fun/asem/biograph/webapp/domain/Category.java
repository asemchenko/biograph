package fun.asem.biograph.webapp.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
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
    @OneToOne
    @JoinColumn(name = "sensitive_record_id")
    private SensitiveRecord data;
    /**
     * User can assign custom color to event category
     */
    private String color;
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
