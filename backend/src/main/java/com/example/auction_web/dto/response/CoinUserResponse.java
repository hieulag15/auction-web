package com.example.auction_web.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class CoinUserResponse {
    String coinUserId;
    String userId;
    BigDecimal coinQuantity;
    Boolean delFlag;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
}