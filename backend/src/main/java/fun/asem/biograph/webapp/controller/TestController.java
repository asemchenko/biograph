package fun.asem.biograph.webapp.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/test")
@RestController
public class TestController {
    @GetMapping("/")
    public String test(Authentication authentication) {
        return "Welcome " + authentication.getName() + "!";
    }
}
