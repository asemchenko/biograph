package fun.asem.biograph.webapp.service.parameter;

import fun.asem.biograph.webapp.domain.Parameter;
import fun.asem.biograph.webapp.exception.ParameterConstraintFails;

public interface ParameterService {
    void validate(Parameter parameter) throws ParameterConstraintFails;
}
