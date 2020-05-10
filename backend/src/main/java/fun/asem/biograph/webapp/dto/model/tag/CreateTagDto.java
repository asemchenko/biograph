package fun.asem.biograph.webapp.dto.model.tag;

import lombok.Data;

import javax.validation.constraints.Size;

@Data
public class CreateTagDto {
    @Size(min = 1)
    private String name;
    private String description;
    private String color;
}
