package com.sportradar.events.controller;

import com.sportradar.events.dto.CountryResponseDto;
import com.sportradar.events.service.CountryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/countries")
@RequiredArgsConstructor
public class CountryController {

    private final CountryService countryService;

    @GetMapping
    public ResponseEntity<List<CountryResponseDto>> getAll() {
        return ResponseEntity.ok(countryService.getAllCountries());
    }
}
