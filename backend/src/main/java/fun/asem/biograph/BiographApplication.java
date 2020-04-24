package fun.asem.biograph;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BiographApplication {

    public static void main(String[] args) {
        SpringApplication.run(BiographApplication.class, args);
    }
    // TODO asem configure exception handler for all rest endpoints!
    // TODO asem IMPORTANT - проверь чтобы все эндпоинты на вставку чего-то проверяли что поле ид изначально пустое - иначе возможна перезапись чьих-то данных
    // TODO asem удаление аттачментов если удаляется ивент
}
