package fun.asem.biograph.webapp.service.storage;

import com.google.api.services.drive.model.FileList;
import fun.asem.biograph.webapp.domain.User;

import java.io.InputStream;
import java.io.OutputStream;

public interface StorageProviderService {
    String getAuthorizationUrl(User user);

    /**
     * This method is called when user authenticates in such cases:
     * - by granting access to application ( in connecting storage provider firstly )
     * - by re-signing-in
     *
     * @param code temporary code, that is used to request an access token from the
     *             storage provider
     */
    void acceptOauth2CallbackCode(String code, String userId);

    String uploadFile(String fileName, InputStream file, String userId);

    FileList listFiles(String userId);

    void downloadFileInto(String fileId, String userId, OutputStream destinationStream);
}
