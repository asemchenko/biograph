package fun.asem.biograph.webapp.service.registration;

import fun.asem.biograph.webapp.domain.User;
import fun.asem.biograph.webapp.dto.model.ErrorDescription;
import fun.asem.biograph.webapp.dto.model.RegistrationRequest;
import fun.asem.biograph.webapp.dto.model.ServerResponse;
import fun.asem.biograph.webapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.Instant;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    @Override
    public ServerResponse signUp(RegistrationRequest request) {
        ServerResponse response = ServerResponse.builder().build();
        if (!checkDataDuplicates(request, response)) {
            userRepository.save(createUserFrom(request));
            response.setStatus(ServerResponse.ResponseStatus.OK);
        }
        return response;
    }

    private boolean checkDataDuplicates(RegistrationRequest request, ServerResponse response) {
        if (userRepository.existsByNickname(request.getNickname())) {
            response.setStatus(ServerResponse.ResponseStatus.ERROR);
            response.setData(ErrorDescription.builder().message("This nickname is already taken").build());
            return true;
        }
        if (userRepository.existsByCurrentEmail(request.getEmail())) {
            /* FIXME asem
                 Think about situation when an attacker created an account with someone's email
                 In such case account will not be active, but real user will not be able to register
                 Maybe, an ability to drop account should be included in email-confirmation letter
             */
            response.setStatus(ServerResponse.ResponseStatus.ERROR);
            response.setData(ErrorDescription.builder().message("This email is already taken").build());
            return true;
        }
        return false;
    }

    private User createUserFrom(RegistrationRequest request) {
        User user = User
                .builder()
                .nickname(request.getNickname())
                .currentEmail(request.getEmail())
                .creationTime(Instant.now())
                .emailConfirmed(Boolean.FALSE)
                .isCompromised(Boolean.FALSE)
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .hashFunctionType(User.HashFunctionType.SPRING_BCRYPT)
                .build();
        // TODO asem add generation and encryption of databaseMasterKey field
        return user;
    }
}
