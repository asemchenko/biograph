package fun.asem.biograph.webapp.service.attribute;

import fun.asem.biograph.webapp.domain.Attribute;
import fun.asem.biograph.webapp.domain.Grant;
import fun.asem.biograph.webapp.domain.User;
import fun.asem.biograph.webapp.exception.UnauthorizedException;
import fun.asem.biograph.webapp.repository.AttributeRepository;
import fun.asem.biograph.webapp.service.grant.GrantService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.Instant;
import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class AttributeServiceImpl implements AttributeService {
    private final GrantService grantService;
    private final AttributeRepository attributeRepository;

    @Transactional
    @Override
    public List<Attribute> getAllAttributesOwnedByUser(User user) {
        return grantService.getAttributeOwnerGrants(user).stream()
                .map(Grant::getAttribute)
                .collect(Collectors.toList());
    }

    @Transactional
    @Override
    public Attribute create(Attribute attribute, User user) {
        attribute.setCreationTime(Instant.now());
        Grant grant = Grant.builder()
                .user(user)
                .attribute(attribute)
                .accessType(Grant.AccessType.OWNER)
                .build();
        attribute.setGrants(Collections.singletonList(grant));
        attribute = attributeRepository.save(attribute);
        attribute.setTotalCategories(0L);
        attribute.setTotalMeasurements(0L);
        return attribute;
    }

    @Transactional
    @Override
    public void delete(Long attributeId, User user) {
        Attribute attribute = attributeRepository
                .findByAttributeId(attributeId)
                .orElseThrow(() -> new NoSuchElementException("No such attribute with id=" + attributeId));
        checkOwnerAccess(attribute, user);
        attribute.getCategories().forEach(category -> category.getAttributes().remove(attribute));
        attributeRepository.delete(attribute);
    }

    @Override
    public void checkOwnerAccess(Attribute attribute, User user) throws UnauthorizedException {
        if (attributeRepository.findByAttributeId(attribute.getAttributeId())
                .orElseThrow(() -> new NoSuchElementException("No attribute with attributeId=" + attribute.getAttributeId()))
                .getGrants()
                .stream()
                .noneMatch(grant -> grant.getAccessType() == Grant.AccessType.OWNER && grant.getUser().getUserId().equals(user.getUserId()))) {
            throw new UnauthorizedException("You are not authorized to access attribute with attributeId=" + attribute.getAttributeId());
        }
    }

    @Transactional
    @Override
    public Optional<Attribute> findAttributeById(Long attributeId) {
        return attributeRepository.findByAttributeId(attributeId);
    }

    /**
     * Contract - values must exists ( can be check by calling findAttributeById method )
     *
     * @param attribute attribute to be updated
     * @return updated attribute
     * @see AttributeService#findAttributeById(Long)
     */
    @Transactional
    public Attribute update(Attribute attribute) {
        return attributeRepository.save(attribute);
    }
}
