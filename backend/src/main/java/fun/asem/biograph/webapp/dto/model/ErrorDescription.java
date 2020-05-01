package fun.asem.biograph.webapp.dto.model;

import lombok.Builder;
import lombok.Data;

/**
 * Is used for storing information about error in ServerResponse class
 *
 * @see ServerResponse#data
 */
@Data
@Builder
public class ErrorDescription {
    private String message;
}
