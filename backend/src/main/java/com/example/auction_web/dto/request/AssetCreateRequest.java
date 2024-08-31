package com.example.auction_web.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class AssetCreateRequest {
    String vendorId;
    String assetName;
    String slug;
    String mainImage;
    String assetDescription;
    BigDecimal assetPrice;
    String inspectorId;
    String typeId;
    String assetStatusId;
    Boolean delFlag;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
}