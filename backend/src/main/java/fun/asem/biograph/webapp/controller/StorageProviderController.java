package fun.asem.biograph.webapp.controller;

import com.google.api.services.drive.model.File;
import com.google.api.services.drive.model.FileList;
import fun.asem.biograph.webapp.domain.User;
import fun.asem.biograph.webapp.service.storage.StorageProviderService;
import fun.asem.biograph.webapp.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/storage")
@Controller
public class StorageProviderController {
    private final StorageProviderService storageProviderService;
    private final UserService userService;

    @PostMapping("/connect")
    public ResponseEntity<Object> connectStorageProvider(@RequestParam(name = "provider", required = true) String providerName,
                                                         @RequestParam(name = "userId", required = true) Long userId) {
        if (providerName.equalsIgnoreCase("google")) {
            Optional<User> user = userService.findUserByUserId(userId);
            String redirectUrl = user.map(storageProviderService::getAuthorizationUrl).orElseThrow(NoSuchElementException::new);
            // preparing redirect response
            HttpHeaders headers = new HttpHeaders();
            headers.add("Location", redirectUrl);
            // saving userId to cookie with lifetime = 60 seconds
            // FIXME asem SECURITY - change Max-Age back to 60 seconds
            headers.add("Set-Cookie", "userId=" + userId.toString() + ";Max-Age=3600; Path=/");
            return new ResponseEntity<>(headers, HttpStatus.TEMPORARY_REDIRECT);
        } else {
            throw new UnsupportedOperationException("Unknown provider: " + providerName);
        }
    }

    @PostMapping("uploadFile")
    public String uploadFile(@RequestPart("file") MultipartFile file, HttpServletRequest request) throws IOException {
        log.info("Got upload file request from user with id={}", getUserId(request));
        storageProviderService.uploadFile(file.getName(), file.getInputStream(), getUserId(request).toString());
        return "redirect:/api/storage/listFiles";
    }

    /* FIXME asem REFACTOR duplicate method - the same in OAuthController */
    private Long getUserId(HttpServletRequest request) {
        for (Cookie cookie : request.getCookies()) {
            // FIXME asem REFACTOR - get rid of this magic constant - "userId"
            if (cookie.getName().equals("userId")) {
                return Long.parseLong(cookie.getValue());
            }
        }
        throw new NoSuchElementException("Cookie value 'userId' should be present");
    }

    @GetMapping("listFiles")
    public String listFiles(Model model, HttpServletRequest request) {
        FileList files = storageProviderService.listFiles(getUserId(request).toString());
        List<File> filesFiles = files.getFiles();
        File file = filesFiles.get(0);
        model.addAttribute("files", files.getFiles());
        return "listFiles";
    }

    @GetMapping("downloadFile")
    public void downloadFile(@RequestParam(name = "fileId") String fileId, HttpServletRequest request, HttpServletResponse response) throws IOException {
        storageProviderService.downloadFileInto(fileId, getUserId(request).toString(), response.getOutputStream());
        response.flushBuffer();
    }
}
