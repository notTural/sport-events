package com.sportradar.events.repository;

import com.sportradar.events.entity.GoalEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GoalEventRepository extends JpaRepository<GoalEvent, Integer> {

    @Query("SELECT g FROM GoalEvent g LEFT JOIN FETCH g.team WHERE g.result.id = :resultId ORDER BY g.minute ASC NULLS LAST")
    List<GoalEvent> findByResultIdWithTeam(@Param("resultId") Integer resultId);
}
