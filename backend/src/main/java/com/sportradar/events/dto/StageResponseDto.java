package com.sportradar.events.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor
public class StageResponseDto {
    private String id;
    private String name;
    private Integer ordering;
}
