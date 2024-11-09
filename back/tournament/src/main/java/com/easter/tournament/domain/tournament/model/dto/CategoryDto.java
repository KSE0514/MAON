package com.easter.tournament.domain.tournament.model.dto;

import lombok.*;

import java.util.List;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CategoryDto {
    private List<String> categories;
}
