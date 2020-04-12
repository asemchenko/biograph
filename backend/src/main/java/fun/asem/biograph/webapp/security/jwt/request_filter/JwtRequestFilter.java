package fun.asem.biograph.webapp.security.jwt.request_filter;

import fun.asem.biograph.webapp.service.jwt.JwtUserDetailsService;
import fun.asem.biograph.webapp.util.security.jwt.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Objects;
import java.util.Optional;

@RequiredArgsConstructor
@Component
public class JwtRequestFilter extends AuthenticationFilter {
    public static final String JWT_REQUEST_KEYWORD = "Bearer ";
    private final JwtTokenUtil jwtTokenUtil;
    private final JwtUserDetailsService jwtUserDetailsService;

    // TODO asem add some logging here
    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
        Optional<String> jwt = parseJwtTokenFromRequest(httpServletRequest);
        if (jwt.isPresent()) {
            String token = jwt.get();
            // getting user details and validating jwt token
            UserDetails userDetails = jwtUserDetailsService.loadUserByUsername(jwtTokenUtil.getUsername(token));
            if (jwtTokenUtil.validateToken(userDetails, token)) {
                markAuthenticatedInSpringSecurityContext(httpServletRequest, userDetails);
            }
        }
        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }

    private void markAuthenticatedInSpringSecurityContext(HttpServletRequest httpServletRequest, UserDetails userDetails) {
        // configuring Spring Security to manually set an authentication
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken
                = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));
        // putting data in current thread security context
        SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
    }

    private Optional<String> parseJwtTokenFromRequest(HttpServletRequest request) {
        String header = request.getHeader("Authentication");
        if (!Objects.isNull(header) && header.startsWith(JWT_REQUEST_KEYWORD)) {
            return Optional.of(header.substring(JWT_REQUEST_KEYWORD.length()));
        } else {
            return Optional.empty();
        }
    }

}
