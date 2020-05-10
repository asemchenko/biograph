package fun.asem.biograph.webapp.dto.model.tag;

import lombok.Data;

@Data
public class ResponseTagDto {
    private Long tagId;
    private String name;
    private String description;
    private String color;
    private Long totalEvents;
    private String creationTime;
}
