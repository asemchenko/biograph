package fun.asem.biograph.webapp.repository;

import fun.asem.biograph.webapp.domain.Grant;
import fun.asem.biograph.webapp.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GrantRepository extends JpaRepository<Grant, Long> {
    //    List<Grant> findAllByUserAndAccessTypeAndAttributeIdIsNotNull(User user, Grant.AccessType accessType);
    List<Grant> findAllByUserAndAccessTypeAndAttributeIsNotNull(User user, Grant.AccessType accessType);
}
