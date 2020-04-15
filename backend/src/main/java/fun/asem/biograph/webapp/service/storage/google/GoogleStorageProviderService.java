package fun.asem.biograph.webapp.service.storage.google;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeRequestUrl;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.InputStreamContent;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.util.store.DataStoreFactory;
import com.google.api.client.util.store.MemoryDataStoreFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import com.google.api.services.drive.model.File;
import com.google.api.services.drive.model.FileList;
import fun.asem.biograph.webapp.domain.User;
import fun.asem.biograph.webapp.service.storage.StorageProviderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.List;

@Slf4j
@Service
public class GoogleStorageProviderService implements StorageProviderService {
    // TODO asem configure for getting access to application-specific folder instead
    private static final List<String> SCOPES = Collections.singletonList(DriveScopes.DRIVE_APPDATA);
    @Value("${storage.google.clientId}")
    private String CLIENT_ID;
    @Value("${storage.google.clientSecret}")
    private String CLIENT_SECRET;
    @Value("${storage.google.redirectUrl}")
    private String redirectUrl;

    private GoogleAuthorizationCodeFlow _flow;


    @Override
    public String getAuthorizationUrl(User user) {
        GoogleAuthorizationCodeFlow driveFlow = getFlow();
        GoogleAuthorizationCodeRequestUrl url = driveFlow.newAuthorizationUrl();
        return url
                .setRedirectUri(redirectUrl)
                .toURL()
                .toString();
    }

    @Override
    public void acceptOauth2CallbackCode(String code, String userId) {
        try {
            GoogleAuthorizationCodeFlow driveFlow = getFlow();
            GoogleTokenResponse response = driveFlow.newTokenRequest(code).setRedirectUri(redirectUrl).execute();
            Credential credential = driveFlow.createAndStoreCredential(response, userId);
            log.info("Got user credentials for userId={}", userId);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public String uploadFile(String fileName, InputStream file, String userId) {
        File fileMetadata = new File();
        fileMetadata.setName(fileName);
        fileMetadata.setParents(Collections.singletonList("appDataFolder"));

        Drive service = getUserDriveService(userId);
        // TODO asem REFACTOR - maybe it is better to set MIME-type (type parameter name) value in InputStreamContent object constructor instread of null
        File uploadedFile = null;
        try {
            uploadedFile = service.files().create(fileMetadata, new InputStreamContent(null, file)).setFields("id").execute();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return uploadedFile.getId();
    }

    @Override
    public void downloadFileInto(String fileId, String userId, OutputStream destinationStream) {
        Drive driveService = getUserDriveService(userId);
        try {
            driveService.files().get(fileId).executeMediaAndDownloadTo(destinationStream);
        } catch (IOException e) {
            throw new UnsupportedOperationException(e);
        }
    }

    public FileList listFiles(String userId) {
        Drive driveService = getUserDriveService(userId);
        try {
            return driveService.files()
                    .list()
                    .setSpaces("appDataFolder")
                    .execute();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private Drive getUserDriveService(String userId) {
        return new Drive.Builder(getHttpTransport(), JacksonFactory.getDefaultInstance(), getUserCredential(userId))
                .build();
    }

    private HttpTransport getHttpTransport() {
        try {
            return GoogleNetHttpTransport.newTrustedTransport();
        } catch (GeneralSecurityException | IOException e) {
            throw new RuntimeException(e);
        }
    }

    private Credential getUserCredential(String userId) {
        try {
            GoogleAuthorizationCodeFlow driveFlow = getFlow();
            Credential credential = driveFlow.loadCredential(userId);
            if (credential != null
                    && (credential.getRefreshToken() != null ||
                    credential.getExpiresInSeconds() == null ||
                    credential.getExpiresInSeconds() > 60)) {
                return credential;
            }
            throw new RuntimeException("No valid credentials for such user. Need to re-authorize");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private DataStoreFactory getDataStoreFactory() {
        // FIXME asem change to better storage
        return new MemoryDataStoreFactory();
    }

    private GoogleAuthorizationCodeFlow getFlow() {
        try {
            if (_flow == null) {
                _flow = new GoogleAuthorizationCodeFlow.Builder(
                        getHttpTransport(),
                        JacksonFactory.getDefaultInstance(),
                        CLIENT_ID,
                        CLIENT_SECRET,
                        SCOPES)
                        .setDataStoreFactory(getDataStoreFactory())
                        .setAccessType("offline")
                        .build();
            }
            return _flow;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
