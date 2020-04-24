package fun.asem.biograph.webapp.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.Instant;

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
    private String fileName;
    private String description;
    private Instant creationTime;
    /**
     * Filename on the cloud storage. Pretty long random string ( for guarantee unique )
     */
    private String fileNameInStorage;
    private String encryptionAlgorithm;
}
