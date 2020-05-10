package fun.asem.biograph.webapp.service.event;

import fun.asem.biograph.webapp.domain.User;
import fun.asem.biograph.webapp.dto.model.event.CreateEventDto;
import fun.asem.biograph.webapp.dto.model.event.ResponseEventDto;

import java.util.List;

public interface EventService {
    ResponseEventDto create(CreateEventDto eventDto, User owner);

    List<ResponseEventDto> getUserEvents(User owner);
}
