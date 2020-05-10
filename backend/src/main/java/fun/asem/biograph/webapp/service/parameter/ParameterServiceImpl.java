package fun.asem.biograph.webapp.service.parameter;

import fun.asem.biograph.webapp.domain.Attribute;
import fun.asem.biograph.webapp.domain.Parameter;
import fun.asem.biograph.webapp.exception.ParameterConstraintFails;
import fun.asem.biograph.webapp.service.attribute.AttributeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.NoSuchElementException;

@RequiredArgsConstructor
@Service
@Transactional
public class ParameterServiceImpl implements ParameterService {
    private final AttributeService attributeService;

    @Override
    public void validate(Parameter parameter) throws ParameterConstraintFails {
        Attribute attribute = attributeService
                .findAttributeById(parameter.getAttribute().getAttributeId())
                .orElseThrow(() -> new NoSuchElementException("No such attribute with attributeId=" + parameter.getAttribute().getAttributeId()));
        String value = parameter.getValue();
        // TODO asem IMPORTANT implement parameter value validation
        switch (attribute.getAttributeType()) {
            case NUMBER:
                break;
            case ENUMERATION:
                break;
        }
//        throw new ParameterConstraintFails("Provided parameter value: " + value + " does not match attribute constraint");
    }

}
