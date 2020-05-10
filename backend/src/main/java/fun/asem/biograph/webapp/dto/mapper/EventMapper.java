package fun.asem.biograph.webapp.dto.mapper;

import fun.asem.biograph.webapp.domain.Event;
import fun.asem.biograph.webapp.dto.model.event.CreateEventDto;
import fun.asem.biograph.webapp.dto.model.event.ResponseEventDto;
import org.mapstruct.Mapper;

@Mapper
public interface EventMapper {
    Event createDtoToEvent(CreateEventDto eventDto);

    ResponseEventDto eventToDto(Event event);
}
