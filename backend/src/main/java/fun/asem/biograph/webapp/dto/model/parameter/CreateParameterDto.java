package fun.asem.biograph.webapp.dto.model.parameter;

import fun.asem.biograph.webapp.dto.model.attribute.UpdateAttributeDto;
import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class CreateParameterDto {
    @Size(min = 1)
    private String value;
    @NotNull
    private UpdateAttributeDto attribute;
}
