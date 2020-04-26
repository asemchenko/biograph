package fun.asem.biograph.webapp.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "sensitiveRecords")
@Data
@Builder
public class SensitiveRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long sensitiveRecordId;
    private String data;
    private String encryptionAlgorithm;
}
