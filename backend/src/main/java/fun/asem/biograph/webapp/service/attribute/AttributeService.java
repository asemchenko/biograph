package fun.asem.biograph.webapp.service.attribute;

import fun.asem.biograph.webapp.domain.Attribute;
import fun.asem.biograph.webapp.domain.User;

import java.util.List;

public interface AttributeService {
    List<Attribute> getAllAttributesOwnedByUser(User user);
}
