package fun.asem.biograph.webapp.service.attribute;

import fun.asem.biograph.webapp.domain.Attribute;
import fun.asem.biograph.webapp.domain.User;
import fun.asem.biograph.webapp.exception.UnauthorizedException;

import java.util.List;
import java.util.Optional;

public interface AttributeService {
    List<Attribute> getAllAttributesOwnedByUser(User user);

    Attribute create(Attribute attribute, User user);

    void delete(Long attributeId, User user);

    Optional<Attribute> findAttributeById(Long attributeId);

    void checkOwnerAccess(Attribute attribute, User user) throws UnauthorizedException;
}
