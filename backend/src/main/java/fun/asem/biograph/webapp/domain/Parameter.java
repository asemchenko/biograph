package fun.asem.biograph.webapp.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "parameters")
@Data
@Builder
public class Parameter {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long parameterId;
    private Long eventId;
    private String value;
    @ManyToOne
    @JoinColumn(name = "attribute_id")
    private Attribute attribute;
}
