package com.sportradar.events.controller;

import com.sportradar.events.dto.CreateEventRequestDto;
import com.sportradar.events.dto.EventDetailResponseDto;
import com.sportradar.events.dto.EventResponseDto;
import com.sportradar.events.service.EventService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
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
    public ResponseEntity<List<EventResponseDto>> getAll(
            @RequestParam(required = false) String competitionId,
            @RequestParam(required = false) Integer teamId,
            @RequestParam(required = false) String status,
            @RequestParam(required = false, defaultValue = "asc") String sortDate) {
        return ResponseEntity.ok(eventService.getAllEvents(competitionId, teamId, status, sortDate));
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventDetailResponseDto> getOne(@PathVariable Integer id) {
        return ResponseEntity.ok(eventService.getEventDetail(id));
    }

    @PostMapping
    public ResponseEntity<EventResponseDto> create(@RequestBody @Valid CreateEventRequestDto request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(eventService.createEvent(request));
    }
}
