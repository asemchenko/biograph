package fun.asem.biograph.webapp.service.user;

import fun.asem.biograph.webapp.domain.User;

import java.util.Optional;

public interface UserService {
    Optional<User> findUserByEmail(String username);
}
