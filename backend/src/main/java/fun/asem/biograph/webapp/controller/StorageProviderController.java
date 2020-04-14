package fun.asem.biograph.webapp.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import fun.asem.biograph.webapp.domain.StorageProviderType;
import fun.asem.biograph.webapp.domain.User;
import fun.asem.biograph.webapp.dto.AddStorageProviderRequest;
import fun.asem.biograph.webapp.dto.ServerResponse;
import fun.asem.biograph.webapp.service.storage.StorageProviderService;
import fun.asem.biograph.webapp.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.security.Principal;
import java.util.Map;

@RequiredArgsConstructor
@RequestMapping("/api/storage")
@RestController
public class StorageProviderController {
    private final StorageProviderService storageProviderService;
    private final UserService userService;

    @PostMapping
    public ServerResponse connectStorageProvider(@RequestBody @Valid AddStorageProviderRequest request, Principal principal) {
        if (request.getProvider() == StorageProviderType.GOOGLE) {
            User user = userService.getUserByUserDetails(principal.getName());
            String authorizationUrl = storageProviderService.getAuthorizationUrl(user);
            try {
                return ServerResponse.builder()
                        .status(ServerResponse.ResponseStatus.REDIRECT)
                        .data(new ObjectMapper().writeValueAsString(Map.of("redirectUrl", authorizationUrl)))
                        .build();
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
        } else {
            throw new UnsupportedOperationException("Sorry, this provider is not supported yet");
        }
    }
}
