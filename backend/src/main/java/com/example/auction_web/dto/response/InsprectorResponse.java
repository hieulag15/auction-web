package com.example.auction_web.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class InsprectorResponse {
    String insprectorId;
    String userId;
    String license;
    Boolean delFlag;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
}