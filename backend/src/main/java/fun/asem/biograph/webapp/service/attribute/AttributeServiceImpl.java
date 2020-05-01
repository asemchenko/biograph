package fun.asem.biograph.webapp.service.attribute;

import fun.asem.biograph.webapp.domain.Attribute;
import fun.asem.biograph.webapp.domain.Grant;
import fun.asem.biograph.webapp.domain.User;
import fun.asem.biograph.webapp.repository.AttributeRepository;
import fun.asem.biograph.webapp.service.grant.GrantService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.Instant;
import java.util.Collections;
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

    @Transactional
    @Override
    public Attribute create(Attribute attribute, User user) {
        attribute.setCreationTime(Instant.now());
        Grant grant = Grant.builder()
                .user(user)
                .accessType(Grant.AccessType.OWNER)
                .attributeId(attribute.getAttributeId())
                .build();
        attribute.setGrants(Collections.singletonList(grant));
        attribute = attributeRepository.save(attribute);
        return attribute;
    }
}
