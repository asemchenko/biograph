package fun.asem.biograph.webapp.dto.mapper.attribute;

import fun.asem.biograph.webapp.domain.Attribute;
import fun.asem.biograph.webapp.dto.model.attribute.CreateAttributeDto;
import fun.asem.biograph.webapp.dto.model.attribute.ResponseAttributeDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface AttributeMapper {
    AttributeMapper INSTANCE = Mappers.getMapper(AttributeMapper.class);

    ResponseAttributeDto attributeToDto(Attribute attribute);

    Attribute createDtoToAttribute(CreateAttributeDto dto);
}
