package com.sportradar.events.repository;

import com.sportradar.events.entity.GoalEvent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GoalEventRepository extends JpaRepository<GoalEvent, Integer> {}
