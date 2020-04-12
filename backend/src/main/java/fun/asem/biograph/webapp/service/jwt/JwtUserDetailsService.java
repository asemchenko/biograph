package fun.asem.biograph.webapp.service.jwt;

import fun.asem.biograph.webapp.domain.User;
import fun.asem.biograph.webapp.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collections;

@RequiredArgsConstructor
@Component
public class JwtUserDetailsService implements UserDetailsService {
    private final UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userService.findUserByEmail(username).orElseThrow(() -> new UsernameNotFoundException("Can not find user with username: " + username));
        return new org.springframework.security.core.userdetails.User(
                user.getCurrentEmail(),
                user.getPasswordHash(),
                true,
                true,
                user.getIsCompromised(),
                true,
                Collections.emptyList()
        );
    }
}
