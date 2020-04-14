package fun.asem.biograph.webapp.service.user;

import fun.asem.biograph.webapp.domain.User;
import fun.asem.biograph.webapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    public Optional<User> findUserByEmail(String email) {
        return userRepository.findByCurrentEmail(email);
    }

    @Override
    public User getUserByUserDetails(String username) {
        return userRepository.getByCurrentEmail(username);
    }
}
