package fun.asem.biograph.webapp.service.tag;

import fun.asem.biograph.webapp.domain.Tag;
import fun.asem.biograph.webapp.domain.User;
import fun.asem.biograph.webapp.dto.model.tag.CreateTagDto;
import fun.asem.biograph.webapp.dto.model.tag.ResponseTagDto;
import fun.asem.biograph.webapp.exception.UnauthorizedException;

import java.util.List;

public interface TagService {
    ResponseTagDto createTag(CreateTagDto tagDto, User user);

    List<ResponseTagDto> getUserTags(User user);

    void checkOwnerAccess(Tag tag, User user) throws UnauthorizedException;
}
