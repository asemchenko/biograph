package fun.asem.biograph.webapp.controller;

import fun.asem.biograph.webapp.domain.User;
import fun.asem.biograph.webapp.dto.model.tag.CreateTagDto;
import fun.asem.biograph.webapp.dto.model.tag.ResponseTagDto;
import fun.asem.biograph.webapp.service.tag.TagService;
import fun.asem.biograph.webapp.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
@Validated
public class TagController extends BaseController {
    private final UserService userService;
    private final TagService tagService;

    @GetMapping("/users/{userId}/tags")
    public List<ResponseTagDto> getUserTags(@PathVariable Long userId, Principal principal) {
        User currentUser = userService.getUserByUserDetails(principal.getName());
        checkAccess(userId, currentUser);
        return tagService.getUserTags(currentUser);
    }

    @PostMapping("/users/{userId}/tags")
    public ResponseTagDto create(@RequestBody @Valid CreateTagDto createTagDto, @PathVariable Long userId, Principal principal) {
        User currentUser = userService.getUserByUserDetails(principal.getName());
        checkAccess(userId, currentUser);
        return tagService.createTag(createTagDto, currentUser);
    }
}
