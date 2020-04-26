package fun.asem.biograph.webapp.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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
    /**
     * contains attribute name
     */
    @OneToOne
    @JoinColumn(name = "sensitive_record_id")
    private SensitiveRecord data;

    public enum AttributeType {
        NUMBER,
        // maybe in future there will be BOOLEAN, DATE, STRING, ENUM_STRING ( like checkbox ), etc.
    }
}
