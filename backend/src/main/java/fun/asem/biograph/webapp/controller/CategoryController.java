package fun.asem.biograph.webapp.controller;

import fun.asem.biograph.webapp.domain.User;
import fun.asem.biograph.webapp.dto.model.category.CreateCategoryDto;
import fun.asem.biograph.webapp.dto.model.category.ResponseCategoryDto;
import fun.asem.biograph.webapp.service.category.CategoryService;
import fun.asem.biograph.webapp.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
@Validated
public class CategoryController extends BaseController {
    private final CategoryService categoryService;
    private final UserService userService;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/users/{userId}/categories")
    public ResponseCategoryDto create(
            @RequestBody @Valid CreateCategoryDto categoryDto,
            @PathVariable Long userId,
            Principal principal) {
        User currentUser = userService.getUserByUserDetails(principal.getName());
        checkAccess(userId, currentUser);
        return categoryService.create(categoryDto, currentUser);
    }

    @GetMapping("/users/{userId}/categories")
    public List<ResponseCategoryDto> getUserCategories(@PathVariable Long userId, Principal principal) {
        User currentUser = userService.getUserByUserDetails(principal.getName());
        checkAccess(userId, currentUser);
        return categoryService.getUserCategories(currentUser);
    }
}
