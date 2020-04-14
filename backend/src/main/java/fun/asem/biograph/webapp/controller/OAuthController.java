package fun.asem.biograph.webapp.controller;

import fun.asem.biograph.webapp.service.storage.google.GoogleStorageProviderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

@RequiredArgsConstructor
@RequestMapping("/oauth2")
@Controller
public class OAuthController {
    private final GoogleStorageProviderService googleService;

    @GetMapping("/google")
    public void acceptCode(HttpServletRequest request) {
        String code = request.getParameter("code");
        googleService.acceptOauth2CallbackCode(code);
        System.out.println("Got callback!");
    }
    /*@GetMapping("/google")
    public void acceptCode(@RequestParam(name = "code", required = true) String code) {
        System.out.println("Got callback!");
    }*/
}
