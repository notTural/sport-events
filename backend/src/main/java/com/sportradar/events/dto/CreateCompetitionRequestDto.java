package com.sportradar.events.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor
public class CreateCompetitionRequestDto {
    @NotBlank
    private String id;
    @NotBlank
    private String name;
}
