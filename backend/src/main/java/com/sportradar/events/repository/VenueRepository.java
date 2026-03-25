package com.sportradar.events.repository;

import com.sportradar.events.entity.Venue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VenueRepository extends JpaRepository<Venue, Integer> {}
