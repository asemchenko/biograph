package fun.asem.biograph.webapp.dto.model.event;

import fun.asem.biograph.webapp.dto.model.category.UpdateCategoryDto;
import fun.asem.biograph.webapp.dto.model.parameter.CreateParameterDto;
import fun.asem.biograph.webapp.dto.model.tag.UpdateTagDto;
import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.Instant;
import java.util.List;

@Data
public class CreateEventDto {
    @Size(min = 1)
    private String name;
    private String description;
    @NotNull
    private Instant startDatetime;
    private Instant endDatetime;
    @NotNull
    private UpdateCategoryDto category;
    @NotNull
    private List<CreateParameterDto> parameters;
    private List<UpdateTagDto> tags;
}
