package fun.asem.biograph.webapp.domain;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
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
    private String creationTime;
    private AttributeType attributeType;
    @OneToOne
    @JoinColumn(name = "constraint_id")
    private Constraint constraint;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "attributeId")
    private List<Grant> grants;

    @JsonGetter("totalMeasurements")
    private Long getTotalMeasurements() {
        return 0L;
    }

    @JsonGetter("totalCategories")
    private Long getTotalCategories() {
        return 0L;
    }

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
        private String name;
        private String possibleValues;
        private Double min;
        private Double max;
    }
}
