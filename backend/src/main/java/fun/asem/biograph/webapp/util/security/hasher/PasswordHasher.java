package fun.asem.biograph.webapp.util.security.hasher;

import fun.asem.biograph.webapp.domain.User;

public interface PasswordHasher {
    /**
     * Returns the time of current hash function implementation
     * Actually, determines the type of hashing logic
     * Depends of concrete implementation
     * The same PasswordHasher implementation always returns
     * the same value
     *
     * @return id of the hash function algorithm
     */
    User.HashFunctionType getHashFunctionType();

    String hash(String password);

    boolean checkPassword(String expectedHash, String password);
}
