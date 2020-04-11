package fun.asem.biograph.webapp.util.security.hasher;

import fun.asem.biograph.webapp.domain.User;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.security.SecureRandom;
import java.util.Base64;

@Component
public class ArgonBasedPasswordHasher implements PasswordHasher {
    @Override
    public User.HashFunctionType getHashFunctionType() {
        return User.HashFunctionType.SHA3_ARGON2_AES128;
    }

    @Override
    public String hash(String password) {
        // TODO asem find library and call library method here. Maybe NaCl or libsodium is suitable here
        SecureRandom secureRandom = new SecureRandom();
        byte[] salt = new byte[64];
        secureRandom.nextBytes(salt);
        PBEKeySpec spec = new PBEKeySpec(password.toCharArray(), salt, 65536, 128);
        SecretKeyFactory instance = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA2");
        instance.generateSecret(spec).getEncoded();
        Base64.Encoder encoder = Base64.getEncoder();

    }

    @Override
    public boolean checkPassword(String expectedHash, String password) {
        // TODO asem find library and call library method here. Maybe NaCl of libsodium is suitable here
        // TODO asem DO NOT WRITE YOUR OWN COMPARISON CODE HERE! PAY ATTENTION ON TIME-BASED ATTACKS!!!
        throw new UnsupportedOperationException();
    }
}
