package fun.asem.biograph.webapp.service.storage.google;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeRequestUrl;
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
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.List;

@Slf4j
@Service
public class GoogleStorageProviderService implements StorageProviderService {
    // TODO asem configure for getting access to application-specific folder instead
    private static final List<String> SCOPES = Collections.singletonList(DriveScopes.DRIVE_METADATA_READONLY);
    // FIXME asem check for thread safety!!!
    private final JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();
    @Value("${storage.google.clientId}")
    private String CLIENT_ID;
    @Value("${storage.google.clientSecret}")
    private String CLIENT_SECRET;
    @Value("${storage.google.redirectUrl}")
    private String redirectUrl;

    @Override
    public String getAuthorizationUrl(User user) {
        try {
            final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
            GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(
                    HTTP_TRANSPORT,
                    JacksonFactory.getDefaultInstance(),
                    CLIENT_ID,
                    CLIENT_SECRET,
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

    @Override
    public void acceptOauth2CallbackCode(String code, String userId) {
        try {
            final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
            GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(
                    HTTP_TRANSPORT,
                    JacksonFactory.getDefaultInstance(),
                    CLIENT_ID,
                    CLIENT_SECRET,
                    SCOPES)
                    .setDataStoreFactory(new MemoryDataStoreFactory())
                    .setAccessType("offline")
                    .build();
            GoogleTokenResponse response = flow.newTokenRequest(code).setRedirectUri(redirectUrl).execute();
            Credential credential = flow.createAndStoreCredential(response, userId);
            log.info("Got user credentials for userId={}", userId);
        } catch (GeneralSecurityException | IOException e) {
            throw new RuntimeException(e);
        }
    }
}
