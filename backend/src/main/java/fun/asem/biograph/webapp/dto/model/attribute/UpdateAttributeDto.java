package fun.asem.biograph.webapp.dto.model.attribute;

import fun.asem.biograph.webapp.domain.Attribute;
import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class UpdateAttributeDto {
    @NotNull
    private Long attributeId;
    @Size(min = 1, max = 30)
    private String name;
    private String description;
    private String attributeType;
    private Attribute.Constraint constraint;
}
