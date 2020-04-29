package fun.asem.biograph.webapp.dto.attribute;

import fun.asem.biograph.webapp.domain.Attribute;
import lombok.Data;

import javax.validation.constraints.Size;

@Data
public class CreateAttributeDto {
    @Size(min = 1, max = 30)
    private String name;
    private String description;
    private String attributeType;
    private Attribute.Constraint constraint;
}
