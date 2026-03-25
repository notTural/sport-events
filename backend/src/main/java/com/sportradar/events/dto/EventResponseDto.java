package com.sportradar.events.dto;

import lombok.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter @Setter @NoArgsConstructor
public class EventResponseDto {
    private Integer id;
    private Integer season;
    private LocalDate dateVenue;
    private LocalTime timeVenueUtc;
    private String status;
    private String competitionId;
    private String competitionName;
    private String stageId;
    private String stageName;
    private TeamDto homeTeam;
    private TeamDto awayTeam;
    private String venueName;
    private String venueCity;

    @Getter @Setter @NoArgsConstructor
    public static class TeamDto {
        private Integer id;
        private String name;
        private String officialName;
        private String abbreviation;
        private String countryCode;
    }
}