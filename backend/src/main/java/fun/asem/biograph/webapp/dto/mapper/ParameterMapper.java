package fun.asem.biograph.webapp.dto.mapper;

import fun.asem.biograph.webapp.domain.Parameter;
import fun.asem.biograph.webapp.dto.model.parameter.CreateParameterDto;
import fun.asem.biograph.webapp.dto.model.parameter.ResponseParameterDto;
import org.mapstruct.Mapper;

@Mapper
public interface ParameterMapper {
    Parameter createDtoToParameter(CreateParameterDto dto);

    ResponseParameterDto parameterToDto(Parameter parameter);
}
