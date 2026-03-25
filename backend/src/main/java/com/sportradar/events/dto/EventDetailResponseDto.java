package com.sportradar.events.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Getter @Setter @NoArgsConstructor
public class EventDetailResponseDto {

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
    private Integer venueCapacity;
    private String venueCountry;

    private ResultDto result;

    @Getter @Setter @NoArgsConstructor
    public static class TeamDto {
        private Integer id;
        private String name;
        private String officialName;
        private String abbreviation;
        private String countryCode;
    }

    @Getter @Setter @NoArgsConstructor
    public static class ResultDto {
        private Integer winnerTeamId;
        private String winnerTeamName;
        private String message;
        private int homeScore;
        private int awayScore;
        private List<GoalDto> goals;
        private List<CardDto> cards;
    }

    @Getter @Setter @NoArgsConstructor
    public static class GoalDto {
        private Integer teamId;
        private String teamName;
        private String playerName;
        private Integer minute;
        private String goalType;
    }

    @Getter @Setter @NoArgsConstructor
    public static class CardDto {
        private Integer teamId;
        private String teamName;
        private String playerName;
        private Integer minute;
        private String cardType;
    }
}
