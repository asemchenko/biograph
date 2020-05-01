package fun.asem.biograph.webapp.dto.attribute;


import fun.asem.biograph.webapp.domain.Attribute;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;

import java.time.Instant;
import java.util.Collections;

import static org.junit.jupiter.api.Assertions.assertEquals;


class ResponseAttributeDtoTest {
    private final ModelMapper modelMapper = new ModelMapper();

    @Test
    public void whenConvertDtoToEntity_thenCorrect() {
        Attribute attribute = new Attribute(
                123L,
                "testName",
                "test description",
                Instant.MIN,
                Attribute.AttributeType.NUMBER,
                new Attribute.Constraint(
                        2L,
                        "testConstraint",
                        "1,2,3",
                        12.,
                        19.
                ),
                Collections.emptyList(),
                0L,
                0L
        );
        ResponseAttributeDto dto = modelMapper.map(attribute, ResponseAttributeDto.class);
        assertEquals("testName", dto.getName());
        assertEquals("test description", dto.getDescription());
        assertEquals(123L, dto.getAttributeId());
        assertEquals(0L, dto.getTotalCategories());
        assertEquals(0L, dto.getTotalMeasurements());
        assertEquals(Instant.MIN.toString(), dto.getCreationTime());
        assertEquals("testConstraint", dto.getConstraint().getName());
        assertEquals("1,2,3", dto.getConstraint().getPossibleValues());
        assertEquals(12., dto.getConstraint().getMin());
        assertEquals(19., dto.getConstraint().getMax());
        assertEquals(2L, dto.getConstraint().getId());
    }
}
