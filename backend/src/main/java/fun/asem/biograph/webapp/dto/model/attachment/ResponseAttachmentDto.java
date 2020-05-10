package fun.asem.biograph.webapp.dto.model.attachment;

import lombok.Data;

@Data
public class ResponseAttachmentDto {
    private Long attachmentId;
    private String fileName;
    private String description;
    private String fileNameInStorage;
}
