package fun.asem.biograph.webapp.dto.mapper;

import fun.asem.biograph.webapp.domain.Tag;
import fun.asem.biograph.webapp.dto.model.tag.CreateTagDto;
import fun.asem.biograph.webapp.dto.model.tag.ResponseTagDto;
import fun.asem.biograph.webapp.dto.model.tag.UpdateTagDto;
import org.mapstruct.Mapper;

@Mapper
public interface TagMapper {
    Tag createDtoToTag(CreateTagDto createTagDto);

    ResponseTagDto tagToDto(Tag tag);

    Tag updateDtoToTag(UpdateTagDto dto);

    UpdateTagDto entityToUpdateDto(Tag tag);
}
