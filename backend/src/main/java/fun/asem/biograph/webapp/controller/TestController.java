package fun.asem.biograph.webapp.controller;

import fun.asem.biograph.webapp.dto.ServerResponse;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@RequestMapping("/home")
@Controller
public class TestController {
    @GetMapping("")
    public String test(Authentication authentication) {
        return "home";
    }

    @ResponseBody
    @GetMapping("/secured")
    public ServerResponse securedTest() {
        return ServerResponse
                .builder()
                .status(ServerResponse.ResponseStatus.OK)
                .data("You are now authenticated")
                .build();
    }
}
