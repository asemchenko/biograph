package fun.asem.biograph.webapp.service.tag;

import fun.asem.biograph.webapp.domain.Grant;
import fun.asem.biograph.webapp.domain.Tag;
import fun.asem.biograph.webapp.domain.User;
import fun.asem.biograph.webapp.dto.mapper.TagMapper;
import fun.asem.biograph.webapp.dto.model.tag.CreateTagDto;
import fun.asem.biograph.webapp.dto.model.tag.ResponseTagDto;
import fun.asem.biograph.webapp.repository.TagRepository;
import fun.asem.biograph.webapp.service.grant.GrantService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.Instant;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Transactional
@RequiredArgsConstructor
@Service
public class TagServiceImpl implements TagService {
    private final GrantService grantService;
    private final TagRepository tagRepository;
    private final TagMapper tagMapper;

    @Transactional
    @Override
    public ResponseTagDto createTag(CreateTagDto tagDto, User user) {
        Tag tag = tagMapper.createDtoToTag(tagDto);
        tag.setCreationTime(Instant.now());
        Grant grant = Grant.builder()
                .user(user)
                .tag(tag)
                .accessType(Grant.AccessType.OWNER)
                .build();
        tag.setGrants(Collections.singletonList(grant));
        tag = tagRepository.save(tag);
        return tagMapper.tagToDto(tag);
    }

    @Override
    public List<ResponseTagDto> getUserTags(User user) {
        return grantService.getTagOwnerGrants(user)
                .stream()
                .map(Grant::getTag)
                .map(tagMapper::tagToDto)
                .collect(Collectors.toList());
    }
}
