package fun.asem.biograph.webapp.dto.mapper;

import fun.asem.biograph.webapp.domain.Attachment;
import fun.asem.biograph.webapp.dto.model.attachment.ResponseAttachmentDto;
import org.mapstruct.Mapper;

@Mapper
public interface AttachmentMapper {
    ResponseAttachmentDto attachmentToDto(Attachment attachment);
}
