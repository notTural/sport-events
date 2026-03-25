package com.sportradar.events.service;

import com.sportradar.events.dto.StageResponseDto;
import com.sportradar.events.repository.StageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StageService {

    private final StageRepository stageRepository;

    public List<StageResponseDto> getAllStages() {
        return stageRepository.findAll()
                .stream()
                .sorted(Comparator.comparingInt(s -> s.getOrdering()))
                .map(s -> {
                    StageResponseDto dto = new StageResponseDto();
                    dto.setId(s.getId());
                    dto.setName(s.getName());
                    dto.setOrdering(s.getOrdering());
                    return dto;
                })
                .toList();
    }
}
