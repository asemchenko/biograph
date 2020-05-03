package fun.asem.biograph.webapp.dto.model.category;

import fun.asem.biograph.webapp.dto.model.attribute.UpdateAttributeDto;
import lombok.Data;

import javax.validation.constraints.Size;
import java.util.List;

@Data
public class CreateCategoryDto {
    @Size(min = 1)
    private String name;
    private String description;
    private String color;
    private List<UpdateAttributeDto> attributes;
}
