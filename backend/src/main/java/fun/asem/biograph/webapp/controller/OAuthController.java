package fun.asem.biograph.webapp.controller;

import fun.asem.biograph.webapp.service.storage.google.GoogleStorageProviderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.NoSuchElementException;

@RequiredArgsConstructor
@RequestMapping("/oauth2")
@Controller
public class OAuthController {
    private final GoogleStorageProviderService googleService;

    @GetMapping("/google")
    public String acceptCode(HttpServletRequest request) {
        String code = request.getParameter("code");
        googleService.acceptOauth2CallbackCode(code, getUserId(request).toString());
        return "provider-added";
    }

    private Long getUserId(HttpServletRequest request) {
        for (Cookie cookie : request.getCookies()) {
            // FIXME asem REFACTOR - get rid of this magic constant - "userId"
            if (cookie.getName().equals("userId")) {
                return Long.parseLong(cookie.getValue());
            }
        }
        throw new NoSuchElementException("Cookie value 'userId' should be present");
    }
}
