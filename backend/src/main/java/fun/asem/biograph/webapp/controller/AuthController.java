package fun.asem.biograph.webapp.controller;

import fun.asem.biograph.webapp.dto.AuthorizationRequest;
import fun.asem.biograph.webapp.dto.RegistrationRequest;
import fun.asem.biograph.webapp.dto.ServerResponse;
import fun.asem.biograph.webapp.service.registration.RegistrationService;
import fun.asem.biograph.webapp.util.security.jwt.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Objects;

@RequiredArgsConstructor
@RequestMapping("/api/auth")
@RestController
@Validated
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final RegistrationService registrationService;
    private final JwtTokenUtil jwtTokenUtil;
    private final UserDetailsService userDetailsService;

    @PostMapping("/signUp")
    public ServerResponse signUp(@RequestBody @Valid RegistrationRequest registrationRequest) {
        return registrationService.signUp(registrationRequest);
    }

    @PostMapping("/signIn")
    public ServerResponse signIn(@RequestBody @Valid AuthorizationRequest authorizationRequest) {
        try {
            // checking user credentials
            authenticateWithSpringAuthenticationManager(authorizationRequest.getEmail(), authorizationRequest.getPassword());
            // getting user info ( needed for token issuing process )
            UserDetails userDetails = userDetailsService.loadUserByUsername(authorizationRequest.getEmail());
            // issue token to client and send it
            String token = jwtTokenUtil.generateToken(userDetails);
            return ServerResponse.builder()
                    .status(ServerResponse.ResponseStatus.OK)
                    .data(token)
                    .build();
        } catch (DisabledException e) {
            return ServerResponse.builder()
                    .status(ServerResponse.ResponseStatus.ERROR)
                    .data("Your account was disabled because of an suspicious activity")
                    .build();
        } catch (BadCredentialsException e) {
            return ServerResponse.builder()
                    .status(ServerResponse.ResponseStatus.ERROR)
                    .data("Invalid credentials")
                    .build();
        } catch (AuthenticationException e) {
            return ServerResponse.builder()
                    .status(ServerResponse.ResponseStatus.ERROR)
                    .data("Authentication error")
                    .build();
        }
    }

    private void authenticateWithSpringAuthenticationManager(String email, String password) {
        Objects.requireNonNull(email, "Email value is expected");
        Objects.requireNonNull(password, "Password value is expected");
        // throws an exception if credentials are invalid
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
    }
}
