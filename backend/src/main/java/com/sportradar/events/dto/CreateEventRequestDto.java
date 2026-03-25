package com.sportradar.events.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter @Setter @NoArgsConstructor
public class CreateEventRequestDto {
    @NotNull
    private Integer season;
    @NotNull
    private LocalDate dateVenue;
    private LocalTime timeVenueUtc;
    @NotBlank
    private String status;
    @NotBlank
    private String competitionId;
    @NotBlank
    private String stageId;
    private Integer groupId;
    private Integer homeTeamId;
    private Integer awayTeamId;
    private Integer venueId;
}