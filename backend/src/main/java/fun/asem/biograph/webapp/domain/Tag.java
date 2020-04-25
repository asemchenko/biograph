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
@Table(name = "tags")
@Data
@Builder
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long tagId;
    /**
     * contains tag name
     */
    @OneToOne
    @JoinColumn(name = "sensitiveRecordId")
    private SensitiveRecord data;
    private String tagColor;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "tagId")
    private List<Grant> grants;
}
