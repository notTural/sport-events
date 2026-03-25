package com.sportradar.events.controller;

import com.sportradar.events.dto.CreateEventRequestDto;
import com.sportradar.events.dto.EventResponseDto;
import com.sportradar.events.service.EventService;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import lombok.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

    @GetMapping
    public ResponseEntity<List<EventResponseDto>> getAll() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventResponseDto> getOne(@PathVariable Integer id) {
        return ResponseEntity.ok(eventService.getEventById(id));
    }

    @PostMapping
    public ResponseEntity<EventResponseDto> create(@RequestBody @Valid CreateEventRequestDto request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(eventService.createEvent(request));
    }
}
