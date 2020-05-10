package fun.asem.biograph.webapp.repository;

import fun.asem.biograph.webapp.domain.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Long> {
}
