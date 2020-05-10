package fun.asem.biograph.webapp.repository;

import fun.asem.biograph.webapp.domain.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
}
