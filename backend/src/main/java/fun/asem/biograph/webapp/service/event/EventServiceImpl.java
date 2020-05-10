package fun.asem.biograph.webapp.service.event;

import fun.asem.biograph.webapp.domain.*;
import fun.asem.biograph.webapp.dto.mapper.EventMapper;
import fun.asem.biograph.webapp.dto.model.event.CreateEventDto;
import fun.asem.biograph.webapp.dto.model.event.ResponseEventDto;
import fun.asem.biograph.webapp.exception.UnauthorizedException;
import fun.asem.biograph.webapp.exception.ValidationException;
import fun.asem.biograph.webapp.repository.EventRepository;
import fun.asem.biograph.webapp.service.category.CategoryService;
import fun.asem.biograph.webapp.service.grant.GrantService;
import fun.asem.biograph.webapp.service.parameter.ParameterService;
import fun.asem.biograph.webapp.service.tag.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.Instant;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Transactional
public class EventServiceImpl implements EventService {
    private final EventMapper eventMapper;
    private final CategoryService categoryService;
    private final TagService tagService;
    private final ParameterService parameterService;
    private final EventRepository eventRepository;
    private final GrantService grantService;

    @Transactional
    @Override
    public ResponseEventDto create(CreateEventDto eventDto, User owner) {
        Event event = eventMapper.createDtoToEvent(eventDto);
        check(owner, event);
        Grant grant = Grant.builder()
                .user(owner)
                .accessType(Grant.AccessType.OWNER)
                .event(event)
                .build();
        event.setGrants(Collections.singletonList(grant));
        event.setCreationTime(Instant.now());
        event.setLastModifiedTime(Instant.now());
        return eventMapper.eventToDto(eventRepository.save(event));
    }

    private void check(User owner, Event event) {
        checkAccess(event, owner);
        // saving parameters
        setCyclicRelationship(event);
        validateParameters(event.getParameters(), categoryService.getById(event.getCategory().getCategoryId()));
        // TODO asem validate startDateTime and endDatetime
    }

    private void validateParameters(List<Parameter> parameters, Category category) {
        // 1) check that there is no missing parameters ( attribute exists on category, but not present IRL )
        if (category.getAttributes().size() != parameters.stream().map(parameter -> parameter.getAttribute().getAttributeId()).distinct().count()) {
            throw new ValidationException("Parameters amount does not equal to category attribute amount");
        }
        // 2) check that every parameter corresponds to event category
        List<Long> paramAttributeIds = parameters.stream().map(parameter -> parameter.getAttribute().getAttributeId()).sorted().collect(Collectors.toList());
        List<Long> categoryAttributeIds = category.getAttributes().stream().map(Attribute::getAttributeId).sorted().collect(Collectors.toList());
        if (!categoryAttributeIds.equals(paramAttributeIds)) {
            throw new ValidationException("Parameters does not match category attributes");
        }
        // 3) check that parameter value matches attribute value
        parameters.forEach(parameterService::validate);
    }

    /**
     * Sets link to current event for each parameter of event ( to ensure DB consistency )
     */
    private void setCyclicRelationship(Event event) {
        event.getParameters().forEach((parameter -> parameter.setEvent(event)));
    }


    private void checkAccess(Event event, User user) throws UnauthorizedException {
        categoryService.checkOwnerAccess(event.getCategory(), user);
        event.getTags().forEach(tag -> {
            tagService.checkOwnerAccess(tag, user);
        });
        // TODO asem IMPORTANT add attachments check here
    }

    @Transactional
    @Override
    public List<ResponseEventDto> getUserEvents(User owner) {
        return grantService.getEventOwnerGrants(owner).stream()
                .map(Grant::getEvent)
                .map(eventMapper::eventToDto)
                .collect(Collectors.toList());
    }
}
