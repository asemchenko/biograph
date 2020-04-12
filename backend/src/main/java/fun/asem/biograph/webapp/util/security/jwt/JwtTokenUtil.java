package fun.asem.biograph.webapp.util.security.jwt;

import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.Date;
import java.util.Map;

@Slf4j
@Component
public class JwtTokenUtil {
    @Value("${jwt.secret}")
    private String secret;

    public String getUsername(String jwtToken) {
        return getClaimsFromToken(jwtToken).getSubject();
    }

    public boolean validateToken(UserDetails userDetails, String jwtToken) {
        // FIXME asem here userDetails.getUsername() must be not-null. You should check that it is guaranteed.
        try {
            return userDetails.getUsername()
                    .equals(
                            Jwts.parser()
                                    .setSigningKey(secret)
                                    .parseClaimsJws(jwtToken)
                                    .getBody()
                                    .getSubject()
                    );
        } catch (SignatureException ex) {
            log.error("Invalid JWT signature");
        } catch (MalformedJwtException ex) {
            log.error("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            log.error("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            log.error("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            log.error("JWT claims string is empty.");
        }
        return false;
    }

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = Collections.emptyMap();
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userDetails.getUsername())
                .setExpiration(Date.from(Instant.now().plus(60, ChronoUnit.HOURS)))
                .setNotBefore(Date.from(Instant.now()))
                .setIssuedAt(Date.from(Instant.now()))
                .setId("someId") // FIXME asem generate strong random identifier here
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }

    private Claims getClaimsFromToken(String token) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
    }
}
