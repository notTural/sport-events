package com.sportradar.events.repository;

import com.sportradar.events.entity.CardEvent;
import com.sportradar.events.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Integer> {

    @Query("""
        SELECT e FROM Event e
        LEFT JOIN FETCH e.competition
        LEFT JOIN FETCH e.stage
        LEFT JOIN FETCH e.group
        LEFT JOIN FETCH e.homeTeam ht
        LEFT JOIN FETCH ht.country
        LEFT JOIN FETCH e.awayTeam at
        LEFT JOIN FETCH at.country
        LEFT JOIN FETCH e.venue v
        LEFT JOIN FETCH v.country
    """)
    List<Event> findAllWithDetails();
}
