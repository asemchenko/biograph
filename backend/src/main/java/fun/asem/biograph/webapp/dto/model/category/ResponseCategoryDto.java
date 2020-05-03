package fun.asem.biograph.webapp.dto.model.category;

import fun.asem.biograph.webapp.dto.model.attribute.ResponseAttributeDto;
import lombok.Data;

import java.util.List;

@Data
public class ResponseCategoryDto {
    private Long categoryId;
    private String name;
    private String description;
    private String color;
    private String creationTime;
    private List<ResponseAttributeDto> attributes;
    private Long totalEvents;
}
