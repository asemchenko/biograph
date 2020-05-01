package fun.asem.biograph.webapp.service.registration;

import fun.asem.biograph.webapp.dto.model.RegistrationRequest;
import fun.asem.biograph.webapp.dto.model.ServerResponse;

public interface AuthService {
    ServerResponse signUp(RegistrationRequest request);
}
