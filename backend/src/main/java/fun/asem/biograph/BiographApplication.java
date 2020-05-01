package fun.asem.biograph;

import fun.asem.biograph.webapp.domain.Attribute;
import fun.asem.biograph.webapp.dto.attribute.ResponseAttributeDto;
import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BiographApplication {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper mapper = new ModelMapper();
        mapper
                .createTypeMap(Attribute.class, ResponseAttributeDto.class)
                .<String>addMapping(src -> src.getAttributeType().toString(), ((destination, value) -> destination.setAttributeType(value)));
        return mapper;

    }

    public static void main(String[] args) {
        SpringApplication.run(BiographApplication.class, args);
    }
    // TODO asem configure exception handler for all rest endpoints!
    // TODO asem IMPORTANT - проверь чтобы все эндпоинты на вставку чего-то проверяли что поле ид изначально пустое - иначе возможна перезапись чьих-то данных
    // TODO asem удаление аттачментов если удаляется ивент
}
