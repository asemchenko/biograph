package fun.asem.biograph.webapp.exception;

/**
 * Is thrown when parameter value fails attribute validation constraint
 */
public class ParameterConstraintFails extends RuntimeException {
    public ParameterConstraintFails() {
    }

    public ParameterConstraintFails(String message) {
        super(message);
    }

    public ParameterConstraintFails(String message, Throwable cause) {
        super(message, cause);
    }

    public ParameterConstraintFails(Throwable cause) {
        super(cause);
    }

    public ParameterConstraintFails(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
