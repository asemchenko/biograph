package fun.asem.biograph.webapp.service.attribute;

import fun.asem.biograph.webapp.domain.Attribute;
import fun.asem.biograph.webapp.domain.User;

import java.util.List;
import java.util.Optional;

public interface AttributeService {
    List<Attribute> getAllAttributesOwnedByUser(User user);

    Attribute create(Attribute attribute, User user);

    Optional<Attribute> findAttributeById(Long attributeId);
}
