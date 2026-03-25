package com.sportradar.events.repository;

import com.sportradar.events.entity.Event;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;

public interface EventRepository extends JpaRepository<Event, Integer>, JpaSpecificationExecutor<Event> {

    @Override
    @EntityGraph(value = "Event.details")
    Optional<Event> findById(Integer id);

    @Override
    @EntityGraph(value = "Event.details")
    List<Event> findAll(Specification<Event> spec, Sort sort);
}
