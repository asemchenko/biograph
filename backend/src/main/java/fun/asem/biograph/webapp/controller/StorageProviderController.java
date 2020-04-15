package fun.asem.biograph.webapp.controller;

import fun.asem.biograph.webapp.domain.User;
import fun.asem.biograph.webapp.service.storage.StorageProviderService;
import fun.asem.biograph.webapp.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.NoSuchElementException;
import java.util.Optional;

@RequiredArgsConstructor
@RequestMapping("/api/storage")
@Controller
public class StorageProviderController {
    private final StorageProviderService storageProviderService;
    private final UserService userService;

    @PostMapping("/connect")
    public ResponseEntity<Object> connectStorageProvider(@RequestParam(name = "provider", required = true) String providerName,
                                                         @RequestParam(name = "userId", required = true) Long userId) {
        if (providerName.equalsIgnoreCase("google")) {
            Optional<User> user = userService.findUserByUserId(userId);
            String redirectUrl = user.map(storageProviderService::getAuthorizationUrl).orElseThrow(NoSuchElementException::new);
            // preparing redirect response
            HttpHeaders headers = new HttpHeaders();
            headers.add("Location", redirectUrl);
            // saving userId to cookie with lifetime = 60 seconds
            headers.add("Set-Cookie", "userId=" + userId.toString() + ";Max-Age=60; Path=/");
            return new ResponseEntity<>(headers, HttpStatus.TEMPORARY_REDIRECT);
        } else {
            throw new UnsupportedOperationException("Unknown provider: " + providerName);
        }
        /*if (request.getProvider() == StorageProviderType.GOOGLE) {
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
        }*/
    }
}
