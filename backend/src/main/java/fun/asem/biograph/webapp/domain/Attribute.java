package fun.asem.biograph.webapp.domain;

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
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "constraint_id")
    private Constraint constraint;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "attributeId")
    private List<Grant> grants;
    // TODO asem add spring @Formula or @Query here
    private Long totalMeasurements;
    private Long totalCategories;

    public enum AttributeType {
        NUMBER,
        ENUMERATION
    }
/*
    @Mapping("attributeType")
    public String getAttributeTypeStr() {
        return this.attributeType.toString();
    }
    public void setAttributeTypeStr(String type) {
        this.attributeType = AttributeType.valueOf(type);
    }*/

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
