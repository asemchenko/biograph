package fun.asem.biograph.webapp.service.category;

import fun.asem.biograph.webapp.domain.Category;
import fun.asem.biograph.webapp.domain.User;
import fun.asem.biograph.webapp.dto.model.category.CreateCategoryDto;
import fun.asem.biograph.webapp.dto.model.category.ResponseCategoryDto;
import fun.asem.biograph.webapp.exception.UnauthorizedException;

import java.util.List;
import java.util.Optional;

public interface CategoryService {
    ResponseCategoryDto create(CreateCategoryDto categoryDto, User user);

    List<ResponseCategoryDto> getUserCategories(User user);

    Optional<Category> findCategoryById(Long categoryId);

    Category getById(Long categoryId);

    void checkOwnerAccess(Category category, User user) throws UnauthorizedException;
}
