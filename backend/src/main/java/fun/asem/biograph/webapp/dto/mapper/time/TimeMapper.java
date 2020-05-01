package fun.asem.biograph.webapp.dto.mapper.time;

import java.time.Instant;

public class TimeMapper {
    public String asString(Instant instant) {
        return Long.valueOf(instant.getNano()).toString();
    }

    public Instant asInstant(String time) {
        return Instant.ofEpochSecond(Long.parseLong(time));
    }
}
