package fun.asem.biograph.webapp.controller;

import fun.asem.biograph.webapp.domain.Attribute;
import fun.asem.biograph.webapp.domain.User;
import fun.asem.biograph.webapp.dto.attribute.CreateAttributeDto;
import fun.asem.biograph.webapp.service.attribute.AttributeService;
import fun.asem.biograph.webapp.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

@RequestMapping("/api/attribute")
@RestController
@RequiredArgsConstructor
public class AttributeController {
    private final UserService userService;
    private final AttributeService attributeService;
    private final ModelMapper modelMapper;

    /**
     * Returns list of all attributes that are owned by current user
     *
     * @return
     */
    @GetMapping
    public List<Attribute> getUserAttributes(Principal principal) {
        return attributeService.getAllAttributesOwnedByUser(getUser(principal));
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Attribute createAttribute(@RequestBody @Valid CreateAttributeDto createAttributeDto) {
        Attribute attribute = convertToEntity(createAttributeDto);
        System.out.println(attribute);
        return attribute;
    }

    private User getUser(Principal principal) {
        return userService.getUserByUserDetails(principal.getName());
    }

    private Attribute convertToEntity(CreateAttributeDto dto) {
        return modelMapper.map(dto, Attribute.class);
    }
}
