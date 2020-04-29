package fun.asem.biograph.webapp.repository;

import fun.asem.biograph.webapp.domain.Attribute;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AttributeRepository extends JpaRepository<Attribute, Long> {
    List<Attribute> findAllByAttributeIdIn(List<Long> attributeIds);
}
