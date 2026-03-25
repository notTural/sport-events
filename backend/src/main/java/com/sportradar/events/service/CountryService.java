package com.sportradar.events.service;

import com.sportradar.events.dto.CountryResponseDto;
import com.sportradar.events.repository.CountryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CountryService {

    private final CountryRepository countryRepository;

    public List<CountryResponseDto> getAllCountries() {
        return countryRepository.findAll()
                .stream()
                .sorted(Comparator.comparing(c -> c.getName()))
                .map(c -> {
                    CountryResponseDto dto = new CountryResponseDto();
                    dto.setCode(c.getCode());
                    dto.setName(c.getName());
                    return dto;
                })
                .toList();
    }
}
