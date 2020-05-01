package fun.asem.biograph.webapp.controller;

import fun.asem.biograph.webapp.dto.model.AuthorizationRequest;
import fun.asem.biograph.webapp.dto.model.ErrorDescription;
import fun.asem.biograph.webapp.dto.model.RegistrationRequest;
import fun.asem.biograph.webapp.dto.model.ServerResponse;
import fun.asem.biograph.webapp.service.registration.AuthService;
import fun.asem.biograph.webapp.service.user.UserService;
import fun.asem.biograph.webapp.util.security.jwt.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.*;
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
    private final AuthService authService;
    private final JwtTokenUtil jwtTokenUtil;
    private final UserDetailsService userDetailsService;
    private final UserService userService;

    @PostMapping("/signUp")
    public ServerResponse signUp(@RequestBody @Valid RegistrationRequest registrationRequest) {
        return authService.signUp(registrationRequest);
    }

    @PostMapping("/signIn")
    public ServerResponse signIn(@RequestBody @Valid AuthorizationRequest authorizationRequest) {
        ServerResponse response;
        try {
            // checking user credentials
            authenticateWithSpringAuthenticationManager(authorizationRequest.getEmail(), authorizationRequest.getPassword());
            // getting user info ( needed for token issuing process )
            UserDetails userDetails = userDetailsService.loadUserByUsername(authorizationRequest.getEmail());
            // issue token to client and send it
            String token = jwtTokenUtil.generateToken(userDetails);
            response = ServerResponse.builder()
                    .status(ServerResponse.ResponseStatus.OK)
                    .build();
            response.setData(userService.getUserByUserDetails(userDetails.getUsername()));
            response.setAuthToken("Bearer " + token);
        } catch (DisabledException e) {
            response = ServerResponse.builder()
                    .status(ServerResponse.ResponseStatus.ERROR)
                    .build();
            response.setData(ErrorDescription.builder().message("Your account was disabled because of an suspicious activity").build());
        } catch (BadCredentialsException e) {
            response = ServerResponse.builder()
                    .status(ServerResponse.ResponseStatus.ERROR)
                    .build();
            response.setData(ErrorDescription.builder().message("Invalid credentials").build());
        } catch (CredentialsExpiredException e) {
            response = ServerResponse.builder()
                    .status(ServerResponse.ResponseStatus.ERROR)
                    .build();
            response.setData(ErrorDescription.builder().message("Credentials has been expired").build());
        } catch (AuthenticationException e) {
            response = ServerResponse.builder()
                    .status(ServerResponse.ResponseStatus.ERROR)
                    .build();
            response.setData(ErrorDescription.builder().message("Authentication error").build());

        }
        return response;
    }

    private void authenticateWithSpringAuthenticationManager(String email, String password) {
        Objects.requireNonNull(email, "Email value is expected");
        Objects.requireNonNull(password, "Password value is expected");
        // throws an exception if credentials are invalid
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
    }
}
