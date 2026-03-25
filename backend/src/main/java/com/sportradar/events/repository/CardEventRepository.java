package com.sportradar.events.repository;

import com.sportradar.events.entity.CardEvent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardEventRepository extends JpaRepository<CardEvent, Integer> {}
