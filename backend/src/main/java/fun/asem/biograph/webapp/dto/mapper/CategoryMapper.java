package fun.asem.biograph.webapp.dto.mapper;

import fun.asem.biograph.webapp.domain.Category;
import fun.asem.biograph.webapp.dto.model.category.CreateCategoryDto;
import fun.asem.biograph.webapp.dto.model.category.ResponseCategoryDto;
import fun.asem.biograph.webapp.dto.model.category.UpdateCategoryDto;
import org.mapstruct.Mapper;

@Mapper
public interface CategoryMapper {
    ResponseCategoryDto entityToDto(Category category);

    Category createDtoToEntity(CreateCategoryDto dto);

    Category updateDtoToCategory(UpdateCategoryDto dto);

    UpdateCategoryDto entityToUpdateDto(Category category);
}
