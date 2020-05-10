package fun.asem.biograph.webapp.repository;

import fun.asem.biograph.webapp.domain.Grant;
import fun.asem.biograph.webapp.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GrantRepository extends JpaRepository<Grant, Long> {
    List<Grant> findAllByUserAndAccessTypeAndAttributeIsNotNull(User user, Grant.AccessType accessType);

    List<Grant> findAllByUserAndAccessTypeAndCategoryIsNotNull(User user, Grant.AccessType accessType);

    List<Grant> findAllByUserAndAccessTypeAndTagIsNotNull(User user, Grant.AccessType accessType);
}
