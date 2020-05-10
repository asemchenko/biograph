package fun.asem.biograph.webapp.dto.model.parameter;

import fun.asem.biograph.webapp.dto.model.attribute.ResponseAttributeDto;
import lombok.Data;

@Data
public class ResponseParameterDto {
    private Long parameterId;
    private String value;
    private ResponseAttributeDto attribute;
}
