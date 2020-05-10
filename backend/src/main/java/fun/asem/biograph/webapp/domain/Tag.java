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
@Table(name = "tags")
@Data
@Builder
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long tagId;
    private String name;
    private String description;
    private String color;
    private Instant creationTime;
    @Formula("( SELECT COUNT(*) FROM event_tags WHERE event_tags.tag_id = tag_id )")
    private Long totalEvents;
    @JsonIgnore
    @OneToMany(
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            mappedBy = "tag",
            fetch = FetchType.LAZY)
    private List<Grant> grants;
}
