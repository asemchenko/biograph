package fun.asem.biograph.webapp.service.grant;

import fun.asem.biograph.webapp.domain.Grant;
import fun.asem.biograph.webapp.domain.User;
import fun.asem.biograph.webapp.repository.GrantRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class GrantServiceImpl implements GrantService {
    private final GrantRepository grantRepository;

    @Override
    public List<Grant> getAttributeOwnerGrants(User user) {
        return grantRepository.findAllByUserAndAccessTypeAndAttributeIsNotNull(user, Grant.AccessType.OWNER);
    }

    @Override
    public List<Grant> getCategoryOwnerGrants(User user) {
        return grantRepository.findAllByUserAndAccessTypeAndCategoryIsNotNull(user, Grant.AccessType.OWNER);
    }

    @Override
    public Grant createGrant(Grant grant) {
        return grantRepository.save(grant);
    }
}
