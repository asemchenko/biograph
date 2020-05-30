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
@Table(name = "attributes")
@Data
@Builder
public class Attribute {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long attributeId;
    private String name;
    private String description;
    private Instant creationTime;
    @Enumerated(EnumType.STRING)
    private AttributeType attributeType;
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "constraint_id")
    private Constraint constraint;
    @JsonIgnore
    @OneToMany(
            cascade = CascadeType.ALL,
            mappedBy = "attribute",
            fetch = FetchType.LAZY)
    private List<Grant> grants;
    @JsonIgnore
    @ManyToMany(mappedBy = "attributes", fetch = FetchType.LAZY)
    private List<Category> categories;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.REMOVE, mappedBy = "attribute", fetch = FetchType.LAZY)
    private List<Parameter> parameters;
    @Formula("( SELECT COUNT(*) FROM parameters WHERE parameters.attribute_id = attribute_id )")
    private Long totalMeasurements;
    @Formula("( SELECT COUNT(*) FROM category_attributes ca WHERE ca.attribute_id = attribute_id )")
    private Long totalCategories;

    public enum AttributeType {
        NUMBER,
        ENUMERATION
    }

    @Entity
    @NoArgsConstructor
    @AllArgsConstructor
    @Table(name = "constraints")
    @Data
    @Builder
    public static class Constraint {
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        private Long id;
        // TODO asem IMPORTANT make enum
        private String name;
        private String possibleValues;
        private Double min;
        private Double max;
    }
}
