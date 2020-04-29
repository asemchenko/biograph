package fun.asem.biograph.webapp.service.attribute;

import fun.asem.biograph.webapp.domain.Attribute;
import fun.asem.biograph.webapp.domain.Grant;
import fun.asem.biograph.webapp.domain.User;
import fun.asem.biograph.webapp.repository.AttributeRepository;
import fun.asem.biograph.webapp.service.grant.GrantService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class AttributeServiceImpl implements AttributeService {
    private final GrantService grantService;
    private final AttributeRepository attributeRepository;

    @Override
    public List<Attribute> getAllAttributesOwnedByUser(User user) {
        return attributeRepository.findAllByAttributeIdIn(
                grantService.getAttributeOwnerGrants(user)
                        .stream()
                        .map(Grant::getAttributeId)
                        .collect(Collectors.toList())
        );
    }
}
