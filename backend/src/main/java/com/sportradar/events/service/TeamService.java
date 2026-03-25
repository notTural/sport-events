package com.sportradar.events.service;

import com.sportradar.events.dto.TeamResponseDto;
import com.sportradar.events.entity.Team;
import com.sportradar.events.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TeamService {

    private final TeamRepository teamRepository;

    public List<TeamResponseDto> getAllTeams() {
        return teamRepository.findAll()
                .stream()
                .map(this::toDto)
                .toList();
    }

    public TeamResponseDto getTeamById(Integer id) {
        Team team = teamRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Team not found"));
        return toDto(team);
    }

    private TeamResponseDto toDto(Team t) {
        TeamResponseDto dto = new TeamResponseDto();
        dto.setId(t.getId());
        dto.setSlug(t.getSlug());
        dto.setName(t.getName());
        dto.setOfficialName(t.getOfficialName());
        dto.setAbbreviation(t.getAbbreviation());
        dto.setFoundedYear(t.getFoundedYear());
        dto.setCountryCode(t.getCountry().getCode());
        dto.setCountryName(t.getCountry().getName());
        return dto;
    }
}
