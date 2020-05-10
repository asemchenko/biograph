package fun.asem.biograph.webapp.dto.mapper;

import fun.asem.biograph.webapp.domain.Attribute;
import fun.asem.biograph.webapp.dto.model.attribute.CreateAttributeDto;
import fun.asem.biograph.webapp.dto.model.attribute.ResponseAttributeDto;
import fun.asem.biograph.webapp.dto.model.attribute.UpdateAttributeDto;
import org.mapstruct.Mapper;

@Mapper
public interface AttributeMapper {

    ResponseAttributeDto attributeToDto(Attribute attribute);

    Attribute createDtoToAttribute(CreateAttributeDto dto);

    Attribute updateDtoToAttribute(UpdateAttributeDto dto);
}
