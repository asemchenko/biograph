package fun.asem.biograph.webapp.repository;

import fun.asem.biograph.webapp.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByCurrentEmail(String currentEmail);

    boolean existsByNickname(String nickname);

    Optional<User> findByCurrentEmail(String currentEmail);
}
