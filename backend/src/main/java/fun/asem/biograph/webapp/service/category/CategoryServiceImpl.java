package fun.asem.biograph.webapp.service.category;

import fun.asem.biograph.webapp.domain.Attribute;
import fun.asem.biograph.webapp.domain.Category;
import fun.asem.biograph.webapp.domain.Grant;
import fun.asem.biograph.webapp.domain.User;
import fun.asem.biograph.webapp.dto.mapper.CategoryMapper;
import fun.asem.biograph.webapp.dto.model.category.CreateCategoryDto;
import fun.asem.biograph.webapp.dto.model.category.ResponseCategoryDto;
import fun.asem.biograph.webapp.exception.UnauthorizedException;
import fun.asem.biograph.webapp.repository.CategoryRepository;
import fun.asem.biograph.webapp.service.attribute.AttributeService;
import fun.asem.biograph.webapp.service.grant.GrantService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.Instant;
import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryMapper categoryMapper;
    private final CategoryRepository categoryRepository;
    private final AttributeService attributeService;
    private final GrantService grantService;

    @Transactional
    @Override
    public ResponseCategoryDto create(CreateCategoryDto categoryDto, User user) {
        Category category = categoryMapper.createDtoToEntity(categoryDto);
        // saving attributes
        List<Attribute> attributes = saveAttributes(category.getAttributes(), user);
        // setting right attributes
        category.setAttributes(attributes);
        // create and set owner grant
        Grant grant = Grant.builder()
                .user(user)
                .category(category)
                .accessType(Grant.AccessType.OWNER)
                .build();
        category.setGrants(Collections.singletonList(grant));
        // persist
        category.setCreationTime(Instant.now());
        category = categoryRepository.save(category);
        return categoryMapper.entityToDto(category);
    }

    private List<Attribute> saveAttributes(List<Attribute> attributes, User user) {
        return attributes
                .stream()
                .map(attribute -> {
                    Attribute a = attributeService.findAttributeById(attribute.getAttributeId()).<IllegalArgumentException>orElseThrow(() -> {
                        throw new IllegalArgumentException("Attribute must exist!");
                    });
                    if (a.getGrants().stream().anyMatch(g -> g.getUser().getUserId().equals(user.getUserId()) && g.getAccessType() == Grant.AccessType.OWNER)) {
                        return a;
                    } else {
                        throw new UnauthorizedException("You do not have permissions for attribute id = " + a.getAttributeId());
                    }
                })
                .collect(Collectors.toList());
    }

    @Transactional
    @Override
    public List<ResponseCategoryDto> getUserCategories(User user) {
        return grantService.getCategoryOwnerGrants(user).stream()
                .map(Grant::getCategory)
                .map(categoryMapper::entityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Category> findCategoryById(Long categoryId) {
        return categoryRepository.findById(categoryId);
    }

    @Override
    public void checkOwnerAccess(Category category, User user) throws UnauthorizedException {
        // check that user owns event category
        if (findCategoryById(category.getCategoryId())
                .orElseThrow(() -> new NoSuchElementException("No category with id: " + category.getCategoryId()))
                .getGrants()
                .stream()
                .noneMatch(grant -> grant.getAccessType() == Grant.AccessType.OWNER && grant.getUser().getUserId().equals(user.getUserId()))) {
            throw new UnauthorizedException("You are not authorized to access category with categoryId: " + category.getCategoryId());
        }
    }

    @Override
    public Category getById(Long categoryId) {
        return categoryRepository.getOne(categoryId);
    }
}
