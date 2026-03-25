package com.sportradar.events.repository;

import com.sportradar.events.entity.CardEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CardEventRepository extends JpaRepository<CardEvent, Integer> {

    @Query("SELECT c FROM CardEvent c LEFT JOIN FETCH c.team WHERE c.result.id = :resultId ORDER BY c.minute ASC NULLS LAST")
    List<CardEvent> findByResultIdWithTeam(@Param("resultId") Integer resultId);
}
