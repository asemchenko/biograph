package fun.asem.biograph.webapp.service.grant;

import fun.asem.biograph.webapp.domain.Grant;
import fun.asem.biograph.webapp.domain.User;

import java.util.List;

public interface GrantService {
    /**
     * Returns list of attribute grants where user is owner
     *
     * @param user user
     * @return
     */
    List<Grant> getAttributeOwnerGrants(User user);

    List<Grant> getCategoryOwnerGrants(User user);

    List<Grant> getTagOwnerGrants(User user);

    Grant createGrant(Grant grant);
}
