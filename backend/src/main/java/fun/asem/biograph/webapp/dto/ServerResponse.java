package fun.asem.biograph.webapp.dto;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Builder
@Data
public class ServerResponse {
    private ResponseStatus status;
    /**
     * Stores response content (either data or error message, depends on response status value)
     */
    private String data;

    public void setData(Object object) {
        try {
            this.data = new ObjectMapper().writeValueAsString(object);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    @RequiredArgsConstructor
    public enum ResponseStatus {
        OK(0),
        ERROR(1),
        WARNING(2);
        private final int code;
    }
}
