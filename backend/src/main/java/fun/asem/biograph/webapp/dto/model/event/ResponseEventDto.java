package fun.asem.biograph.webapp.dto.model.event;

import fun.asem.biograph.webapp.dto.model.attachment.ResponseAttachmentDto;
import fun.asem.biograph.webapp.dto.model.category.ResponseCategoryDto;
import fun.asem.biograph.webapp.dto.model.parameter.ResponseParameterDto;
import fun.asem.biograph.webapp.dto.model.tag.ResponseTagDto;
import lombok.Data;

import java.util.List;

@Data
public class ResponseEventDto {
    private Long eventId;
    private String name;
    private String description;
    private String startDatetime;
    private String endDatetime;
    private String creationTime;
    private String lastModifiedTime;
    private ResponseCategoryDto category;
    private List<ResponseParameterDto> parameters;
    private List<ResponseAttachmentDto> attachments;
    private List<ResponseTagDto> tags;
}
