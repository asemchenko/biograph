package fun.asem.biograph.webapp.domain;

import lombok.*;

import javax.persistence.*;
import java.time.Instant;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
@Data
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long userId;
    private String nickname;
    /**
     * Email that is currently in use. In general, this allows user to change his/her email address.
     * FIXME [future] link table with previous email addresses
     */
    private String currentEmail;
    private String passwordHash;
    private HashFunctionType hashFunctionType;
    private Instant creationTime;
    /**
     * Does the user confirmed his email after registration?
     */
    private Boolean emailConfirmed;
    /**
     * Is set when:
     * - detected some strange activity with user account
     * - there is some data breach & user's password might be leaked
     * - in similar cases
     * <p>
     * When this flag is set:
     * - user is forced to change his/her password
     * - user is disallowed to change the account security settings, such as:
     * - email address
     * - disabling two-factor authentication
     */
    private Boolean isCompromised;
    /**
     * Here is stored the encrypted key for all user's data on the storage(Google Drive, FTP, etc.)
     * Master key is encrypted with <em>encryptionKey=Argon2(user's account password)</em>
     */
    private String databaseMasterKey;

    @RequiredArgsConstructor
    public enum HashFunctionType {
        /**
         * User password firstly hashes with SHA3, than Argon2, than the result is encrypted with
         * AES128 with server key (stored in environment variable). AES-128 encryption is need for
         * key rotation
         */
        SHA3_ARGON2_AES128(0),
        /**
         * Spring's Security Password Encoder based on BCrypt
         *
         * @see org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
         */
        SPRING_BCRYPT(1);
        private final int id;

    }
}
