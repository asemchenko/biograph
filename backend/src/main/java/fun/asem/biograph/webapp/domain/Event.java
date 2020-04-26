package fun.asem.biograph.webapp.domain;

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
@Table(name = "events")
@Data
@Builder
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long eventId;
    /**
     * Contains event name and description
     */
    @OneToOne
    @JoinColumn(name = "sensitive_record_id")
    private SensitiveRecord data;
    private Instant startDatetime;
    private Instant endDatetime;
    private Instant creationTime;
    private Instant lastModifiedTime;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "eventId")
    private List<Parameter> parameters;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "eventId")
    private List<Attachment> attachments;
    @ManyToMany
    @JoinTable(
            name = "event_tags",
            joinColumns = {@JoinColumn(name = "event_id")},
            inverseJoinColumns = {@JoinColumn(name = "tag_id")}
    )
    private List<Tag> tags;
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "eventId")
    private List<Grant> grants;
}
