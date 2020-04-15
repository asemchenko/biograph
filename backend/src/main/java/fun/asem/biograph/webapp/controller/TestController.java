package fun.asem.biograph.webapp.controller;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/home")
@Controller
public class TestController {
    @GetMapping("")
    public String test(Authentication authentication) {
        return "home";
    }
}
