package com.sportradar.events.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor
public class CreateTeamRequestDto {
    @NotBlank
    private String slug;
    @NotBlank
    private String name;
    @NotBlank
    private String officialName;
    @NotBlank
    @Size(max = 3)
    private String abbreviation;
    private Integer foundedYear;
    @NotBlank
    private String countryCode;
}
