package fun.asem.biograph.webapp.service.storage.google;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeRequestUrl;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.util.store.MemoryDataStoreFactory;
import com.google.api.services.drive.DriveScopes;
import fun.asem.biograph.webapp.domain.User;
import fun.asem.biograph.webapp.service.storage.StorageProviderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.StringReader;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

@Slf4j
@Service
public class GoogleStorageProviderService implements StorageProviderService {
    // TODO asem configure for getting access to application-specific folder instead
    private static final List<String> SCOPES = Collections.singletonList(DriveScopes.DRIVE_METADATA_READONLY);
    // FIXME asem check for thread safety!!!
    private final JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();
    @Value("${storage.google.credentialJson}")
    private String CREDENTIALS_JSON;
    @Value("${storage.google.redirectUrl}")
    private String redirectUrl;
    private GoogleClientSecrets clientSecrets;

    @Override
    public String getAuthorizationUrl(User user) {
        try {
            final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
            GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(
                    HTTP_TRANSPORT,
                    JacksonFactory.getDefaultInstance(),
                    getClientSecrets(),
                    SCOPES)
                    .setDataStoreFactory(new MemoryDataStoreFactory())
                    .setAccessType("offline")
                    .build();
            GoogleAuthorizationCodeRequestUrl url = flow.newAuthorizationUrl();
            return url
                    .setRedirectUri(redirectUrl)
                    .toURL()
                    .toString();
        } catch (GeneralSecurityException | IOException e) {
            throw new RuntimeException(e);
        }
    }

    private GoogleClientSecrets getClientSecrets() {
        try {
            if (Objects.isNull(clientSecrets)) {
                clientSecrets = GoogleClientSecrets.load(JSON_FACTORY, new StringReader(CREDENTIALS_JSON));
            }
            return clientSecrets;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void acceptOauth2CallbackCode(String code) {
        try {
            final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
            GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(
                    HTTP_TRANSPORT,
                    JacksonFactory.getDefaultInstance(),
                    getClientSecrets(),
                    SCOPES)
                    .setDataStoreFactory(new MemoryDataStoreFactory())
                    .setAccessType("offline")
                    .build();
            GoogleTokenResponse response = flow.newTokenRequest(code).setRedirectUri(redirectUrl).execute();
            /* FIXME asem IMPORTANT
                 Here is a problem - in this method there is no way to get userId. Now there is a stub 'testUser1'.
                 Should be fixed as soon as possible
             */
            Credential credential = flow.createAndStoreCredential(response, "testUser1");
            log.info("Got user credentials");
        } catch (GeneralSecurityException | IOException e) {
            throw new RuntimeException(e);
        }
    }
}
