package com.sportradar.events.dto;

import lombok.*;

@Getter @Setter @NoArgsConstructor
public class TeamResponseDto {
    private Integer id;
    private String slug;
    private String name;
    private String officialName;
    private String abbreviation;
    private Integer foundedYear;
    private String countryCode;
    private String countryName;
}
