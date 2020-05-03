package fun.asem.biograph.webapp.service.category;

import fun.asem.biograph.webapp.domain.User;
import fun.asem.biograph.webapp.dto.model.category.CreateCategoryDto;
import fun.asem.biograph.webapp.dto.model.category.ResponseCategoryDto;

import java.util.List;

public interface CategoryService {
    ResponseCategoryDto create(CreateCategoryDto categoryDto, User user);

    List<ResponseCategoryDto> getUserCategories(User user);
}
