package com.sportradar.events.controller;

import com.sportradar.events.dto.StageResponseDto;
import com.sportradar.events.service.StageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stages")
@RequiredArgsConstructor
public class StageController {

    private final StageService stageService;

    @GetMapping
    public ResponseEntity<List<StageResponseDto>> getAll() {
        return ResponseEntity.ok(stageService.getAllStages());
    }
}
