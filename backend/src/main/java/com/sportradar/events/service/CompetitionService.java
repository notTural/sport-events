package com.sportradar.events.service;

import com.sportradar.events.dto.CompetitionResponseDto;
import com.sportradar.events.entity.Competition;
import com.sportradar.events.repository.CompetitionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CompetitionService {

    private final CompetitionRepository competitionRepository;

    public List<CompetitionResponseDto> getAllCompetitions() {
        return competitionRepository.findAll()
                .stream()
                .map(this::toDto)
                .toList();
    }

    public CompetitionResponseDto getCompetitionById(String id) {
        Competition competition = competitionRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Competition not found"));
        return toDto(competition);
    }

    private CompetitionResponseDto toDto(Competition c) {
        CompetitionResponseDto dto = new CompetitionResponseDto();
        dto.setId(c.getId());
        dto.setName(c.getName());
        return dto;
    }
}
