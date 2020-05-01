package fun.asem.biograph.webapp.controller;

import fun.asem.biograph.webapp.domain.Attribute;
import fun.asem.biograph.webapp.domain.User;
import fun.asem.biograph.webapp.dto.mapper.attribute.AttributeMapper;
import fun.asem.biograph.webapp.dto.model.attribute.CreateAttributeDto;
import fun.asem.biograph.webapp.dto.model.attribute.ResponseAttributeDto;
import fun.asem.biograph.webapp.exception.UnauthorizedException;
import fun.asem.biograph.webapp.service.attribute.AttributeService;
import fun.asem.biograph.webapp.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@RequestMapping("/api/")
@RestController
@RequiredArgsConstructor
public class AttributeController {
    private final UserService userService;
    private final AttributeService attributeService;
    private final AttributeMapper dtoMapper = AttributeMapper.INSTANCE;

    /**
     * @return Returns list of all attributes that are owned by current user
     */
    @GetMapping("/users/{userId}/attributes")
    public List<ResponseAttributeDto> getUserAttributes(@PathVariable Long userId, Principal principal) {
        User user = getUser(principal);
        checkAccess(userId, user);
        return attributeService.getAllAttributesOwnedByUser(user)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/users/{userId}/attributes")
    public ResponseAttributeDto createAttribute(
            @RequestBody @Valid CreateAttributeDto createAttributeDto,
            @PathVariable Long userId,
            Principal principal) {
        Attribute attribute = convertToEntity(createAttributeDto);
        User user = getUser(principal);
        checkAccess(userId, user);
        return convertToDto(attributeService.create(attribute, user));
    }

    private void checkAccess(Long userId, User user) {
        if (!user.getUserId().equals(userId)) {
            throw new UnauthorizedException();
        }
    }

    private User getUser(Principal principal) {
        return userService.getUserByUserDetails(principal.getName());
    }

    private Attribute convertToEntity(CreateAttributeDto dto) {
        return dtoMapper.createDtoToAttribute(dto);
    }

    private ResponseAttributeDto convertToDto(Attribute attribute) {
        return dtoMapper.attributeToDto(attribute);
    }
}
