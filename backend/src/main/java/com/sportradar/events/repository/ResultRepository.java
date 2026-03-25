package com.sportradar.events.repository;

import com.sportradar.events.entity.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ResultRepository extends JpaRepository<Result, Integer> {

    @Query("SELECT r FROM Result r LEFT JOIN FETCH r.winnerTeam WHERE r.event.id = :eventId")
    Optional<Result> findByEventId(@Param("eventId") Integer eventId);
}
