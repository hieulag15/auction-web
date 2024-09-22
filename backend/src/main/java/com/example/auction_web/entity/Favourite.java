package com.example.auction_web.entity;

import com.example.auction_web.entity.auth.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class Favourite {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String favouriteId;

    @ManyToOne
    @JoinColumn(name = "userId", referencedColumnName = "userId")
    User user;

    @ManyToOne
    @JoinColumn(name = "assetId", referencedColumnName = "assetId")
    Asset asset;

    Boolean delFlag;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
}