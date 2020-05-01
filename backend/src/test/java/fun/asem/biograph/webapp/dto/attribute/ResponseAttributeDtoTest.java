package fun.asem.biograph.webapp.dto.attribute;


import com.github.dozermapper.core.DozerBeanMapperBuilder;
import com.github.dozermapper.core.Mapper;
import fun.asem.biograph.webapp.domain.Attribute;
import org.junit.jupiter.api.Test;

import java.time.Instant;
import java.util.Collections;

import static org.junit.jupiter.api.Assertions.assertEquals;


class ResponseAttributeDtoTest {
    private final Mapper dtoMapper = DozerBeanMapperBuilder.buildDefault();

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
        ResponseAttributeDto dto = dtoMapper.map(attribute, ResponseAttributeDto.class);
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
