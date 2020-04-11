package fun.asem.biograph.webapp.service.registration;

import fun.asem.biograph.webapp.dto.RegistrationRequest;
import fun.asem.biograph.webapp.dto.ServerResponse;

public interface RegistrationService {
    ServerResponse signUp(RegistrationRequest request);
}
