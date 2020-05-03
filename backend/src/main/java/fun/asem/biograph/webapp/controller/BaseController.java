package fun.asem.biograph.webapp.controller;

import fun.asem.biograph.webapp.domain.User;
import fun.asem.biograph.webapp.exception.UnauthorizedException;

public abstract class BaseController {
    protected void checkAccess(Long userId, User user) {
        if (!user.getUserId().equals(userId)) {
            throw new UnauthorizedException();
        }
    }
}
