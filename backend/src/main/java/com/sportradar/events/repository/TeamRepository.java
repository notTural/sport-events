package com.sportradar.events.repository;

import com.sportradar.events.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepository extends JpaRepository<Team, Integer> {}
