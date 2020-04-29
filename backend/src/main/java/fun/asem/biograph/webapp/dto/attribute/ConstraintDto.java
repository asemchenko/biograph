package fun.asem.biograph.webapp.dto.attribute;

import lombok.Data;

import javax.validation.constraints.Size;

@Data
public class ConstraintDto {
    @Size(min = 1)
    private String name;
    private String possibleValues;
    private Double min;
    private Double max;
}
