package com.sportradar.events.repository;

import com.sportradar.events.entity.Competition;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompetitionRepository extends JpaRepository<Competition, String> {}
