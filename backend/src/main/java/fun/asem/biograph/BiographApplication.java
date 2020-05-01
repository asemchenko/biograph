package fun.asem.biograph;

import com.github.dozermapper.core.DozerBeanMapperBuilder;
import com.github.dozermapper.core.Mapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BiographApplication {

    public static void main(String[] args) {
        SpringApplication.run(BiographApplication.class, args);
    }

    @Bean
    public Mapper dtoMapper() {
        return DozerBeanMapperBuilder.buildDefault();
    }
    // TODO asem configure exception handler for all rest endpoints!
    // TODO asem IMPORTANT - проверь чтобы все эндпоинты на вставку чего-то проверяли что поле ид изначально пустое - иначе возможна перезапись чьих-то данных
    // TODO asem удаление аттачментов если удаляется ивент
}
