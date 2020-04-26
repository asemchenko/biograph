package fun.asem.biograph.webapp.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "attachments")
@Data
@Builder
public class Attachment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long attachmentId;
    private Long eventId;
    /**
     * Contains the next properties
     * <ul>
     *     <li>fileName</li>
     *     <li>description</li>
     *     <li>fileNameInStorage</li>
     * </ul>
     */
    @OneToOne
    @JoinColumn(name = "sensitive_record_id")
    private SensitiveRecord data;
}
