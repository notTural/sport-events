package com.sportradar.events.controller;

import com.sportradar.events.dto.CompetitionResponseDto;
import com.sportradar.events.dto.CreateCompetitionRequestDto;
import com.sportradar.events.service.CompetitionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/competitions")
@RequiredArgsConstructor
public class CompetitionController {

    private final CompetitionService competitionService;

    @GetMapping
    public ResponseEntity<List<CompetitionResponseDto>> getAll() {
        return ResponseEntity.ok(competitionService.getAllCompetitions());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CompetitionResponseDto> getOne(@PathVariable String id) {
        return ResponseEntity.ok(competitionService.getCompetitionById(id));
    }

    @PostMapping
    public ResponseEntity<CompetitionResponseDto> create(@RequestBody @Valid CreateCompetitionRequestDto request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(competitionService.createCompetition(request));
    }
}
