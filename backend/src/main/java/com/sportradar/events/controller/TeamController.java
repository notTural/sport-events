package com.sportradar.events.controller;

import com.sportradar.events.dto.CreateTeamRequestDto;
import com.sportradar.events.dto.TeamResponseDto;
import com.sportradar.events.service.TeamService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teams")
@RequiredArgsConstructor
public class TeamController {

    private final TeamService teamService;

    @GetMapping
    public ResponseEntity<List<TeamResponseDto>> getAll() {
        return ResponseEntity.ok(teamService.getAllTeams());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TeamResponseDto> getOne(@PathVariable Integer id) {
        return ResponseEntity.ok(teamService.getTeamById(id));
    }

    @PostMapping
    public ResponseEntity<TeamResponseDto> create(@RequestBody @Valid CreateTeamRequestDto request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(teamService.createTeam(request));
    }
}
