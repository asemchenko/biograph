package fun.asem.biograph.webapp.dto.attribute;

import lombok.Data;

@Data
public class ResponseAttributeDto {
    private Long attributeId;
    private String name;
    private String description;
    private String creationTime;
    private String attributeType;
    private Long totalMeasurements;
    private Long totalCategories;
    private ConstraintDto constraint;
}
