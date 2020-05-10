package fun.asem.biograph.webapp.controller;

import fun.asem.biograph.webapp.domain.User;
import fun.asem.biograph.webapp.dto.model.event.CreateEventDto;
import fun.asem.biograph.webapp.dto.model.event.ResponseEventDto;
import fun.asem.biograph.webapp.service.event.EventService;
import fun.asem.biograph.webapp.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
@Validated
public class EventController extends BaseController {
    private final EventService eventService;
    private final UserService userService;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/users/{userId}/events")
    public ResponseEventDto create(
            @RequestBody @Valid CreateEventDto eventDto,
            @PathVariable Long userId,
            Principal principal) {
        User currentUser = userService.getUserByUserDetails(principal.getName());
        checkAccess(userId, currentUser);
        return eventService.create(eventDto, currentUser);
    }

    @GetMapping("/users/{userId}/events")
    public List<ResponseEventDto> getUserEvents(@PathVariable Long userId, Principal principal) {
        User currentUser = userService.getUserByUserDetails(principal.getName());
        checkAccess(userId, currentUser);
        return eventService.getUserEvents(currentUser);
    }
}
