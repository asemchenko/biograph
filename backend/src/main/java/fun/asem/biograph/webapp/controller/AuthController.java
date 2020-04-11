package fun.asem.biograph.webapp.controller;

import fun.asem.biograph.webapp.dto.RegistrationRequest;
import fun.asem.biograph.webapp.dto.ServerResponse;
import fun.asem.biograph.webapp.service.registration.RegistrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RequiredArgsConstructor
@RequestMapping("/api/auth")
@RestController
@Validated
public class AuthController {
    private final RegistrationService registrationService;

    @PostMapping("/signUp")
    public ServerResponse signUp(@RequestBody @Valid RegistrationRequest registrationRequest) {
        return registrationService.signUp(registrationRequest);
    }
}
