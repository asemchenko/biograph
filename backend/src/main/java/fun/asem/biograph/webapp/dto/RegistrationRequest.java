package fun.asem.biograph.webapp.dto;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.Size;

@Data
public class RegistrationRequest {
    @Size(min = 4, message = "Nickname should consists of at least 4 chars")
    private String nickname;
    @Email(message = "Value does not looks like well-formed email address")
    private String email;
    @Size(min = 12, message = "Password must consists of at least 12 chars")
    private String password;
}
