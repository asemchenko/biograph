package fun.asem.biograph.webapp.controller;

import fun.asem.biograph.webapp.domain.User;
import fun.asem.biograph.webapp.exception.UnauthorizedException;
import fun.asem.biograph.webapp.service.user.UserService;
import lombok.RequiredArgsConstructor;

import java.security.Principal;

@RequiredArgsConstructor
public abstract class BaseController {

    protected void checkAccess(Long userId, User user) {
        if (!user.getUserId().equals(userId)) {
            throw new UnauthorizedException();
        }
    }

    protected void checkAccess(Long userId, Principal principal, UserService userService) {
        User user = userService.getUserByUserDetails(principal.getName());
        checkAccess(userId, user);
    }

    protected User getUser(Principal principal, UserService userService) {
        return userService.getUserByUserDetails(principal.getName());
    }
}
