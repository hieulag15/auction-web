package com.example.auction_web.service.impl;

import com.example.auction_web.dto.request.AuctionSessionCreateRequest;
import com.example.auction_web.dto.request.AuctionSessionUpdateRequest;
import com.example.auction_web.dto.response.AuctionSessionInfoDetail;
import com.example.auction_web.dto.response.AuctionSessionInfoResponse;
import com.example.auction_web.dto.response.AuctionSessionResponse;
import com.example.auction_web.entity.Asset;
import com.example.auction_web.entity.AuctionSession;
import com.example.auction_web.entity.auth.User;
import com.example.auction_web.enums.ASSET_STATUS;
import com.example.auction_web.enums.AUCTION_STATUS;
import com.example.auction_web.exception.AppException;
import com.example.auction_web.exception.ErrorCode;
import com.example.auction_web.mapper.AuctionSessionMapper;
import com.example.auction_web.mapper.UserMapper;
import com.example.auction_web.repository.*;
import com.example.auction_web.repository.auth.UserRepository;
import com.example.auction_web.service.AssetService;
import com.example.auction_web.service.AuctionSessionService;
import com.example.auction_web.service.specification.AuctionSessionSpecification;
import com.example.auction_web.service.specification.RelatedSessionSpecification;
import com.example.auction_web.utils.Quataz.SessionService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class AuctionSessionServiceImpl implements AuctionSessionService {
    AuctionSessionRepository auctionSessionRepository;
    UserRepository userRepository;
    AssetRepository assetRepository;
    AuctionHistoryRepository auctionHistoryRepository;
    AuctionSessionMapper auctionSessionMapper;
    UserMapper userMapper;
    AssetService assetService;
    SessionService sessionService;

    public AuctionSessionResponse createAuctionSession(AuctionSessionCreateRequest request) {
        var auctionSession = auctionSessionMapper.toAuctionItem(request);
        auctionSession.setAuctionSessionId(UUID.randomUUID().toString());
        setAuctionSessionReference(request, auctionSession);

        auctionSession.setStartTime(request.getStartTime().plusHours(7));
        auctionSession.setEndTime(request.getEndTime().plusHours(7));

        Asset asset = assetRepository.findById(request.getAssetId()).orElseThrow(() -> new AppException(ErrorCode.ASSET_NOT_EXISTED));
        asset.setStatus(ASSET_STATUS.ONGOING.toString());
        assetRepository.save(asset);

        AuctionSessionResponse response = auctionSessionMapper.toAuctionItemResponse(auctionSessionRepository.save(auctionSession));

        LocalDateTime startTime = auctionSession.getStartTime();
        LocalDateTime endTime = auctionSession.getEndTime();


        sessionService.scheduleAuctionSessionStart(response.getAuctionSessionId(), startTime);
        sessionService.scheduleAuctionSessionEnd(response.getAuctionSessionId(), endTime);
        return response;
    }

    public AuctionSessionResponse updateAuctionSession(String id, AuctionSessionUpdateRequest request) {
        AuctionSession auctionSession = auctionSessionRepository.findById(id)
                        .orElseThrow(() -> new AppException(ErrorCode.AUCTION_SESSION_NOT_EXISTED));
        request.setStartTime(request.getStartTime().plusHours(7));
        request.setEndTime(request.getEndTime().plusHours(7));
        Asset asset = assetRepository.findById(auctionSession.getAsset().getAssetId())
                .orElseThrow(() -> new AppException(ErrorCode.ASSET_NOT_EXISTED));
        if (request.getStatus() != null && request.getStatus().equals(AUCTION_STATUS.UPCOMING.toString())) {
            asset.setStatus(ASSET_STATUS.ONGOING.toString());
        } else if (request.getStatus() != null && request.getStatus().equals(AUCTION_STATUS.AUCTION_FAILED.toString())) {
            asset.setStatus(ASSET_STATUS.AUCTION_FAILED.toString());
        } else if (request.getStatus() != null && request.getStatus().equals(AUCTION_STATUS.AUCTION_SUCCESS.toString())) {
            asset.setStatus(ASSET_STATUS.AUCTION_SUCCESS.toString());
        }
        assetRepository.save(asset);
        auctionSessionMapper.updateAuctionItem(auctionSession, request);

        sessionService.updateAuctionSession(auctionSession.getAuctionSessionId(), auctionSession.getStartTime(), auctionSession.getEndTime());
        return auctionSessionMapper.toAuctionItemResponse(auctionSessionRepository.save(auctionSession));
    }

    @Transactional
    public AuctionSessionInfoDetail getDetailAuctionSessionById(String auctionSessionId) {
        AuctionSession auctionSession = auctionSessionRepository.findById(auctionSessionId)
                .orElseThrow(() -> new AppException(ErrorCode.AUCTION_SESSION_NOT_EXISTED));
        auctionSession.getUser().getRoles().size();
        AuctionSessionInfoDetail auctionSessionInfoDetail = auctionSessionRepository.findAuctionSessionInfoDetailById(auctionSession.getAuctionSessionId());
        auctionSessionInfoDetail.setAsset(assetService.getAssetById(auctionSession.getAsset().getAssetId()));

        List<AuctionSessionInfoResponse> auctionSessionInfoResponse = auctionHistoryRepository.findAuctionSessionInfo(auctionSession.getAuctionSessionId());
        if (!auctionSessionInfoResponse.isEmpty()) {
            if (auctionSessionInfoResponse.get(0).getHighestBid().compareTo(BigDecimal.ZERO) == 0) {
                auctionSessionInfoResponse.get(0).setHighestBid(auctionSession.getStartingBids());
            }

            if (auctionSessionInfoResponse.get(0).getUserId() != null) {
                auctionSessionInfoResponse.get(0).setUser(userMapper.toUserResponse(userRepository.findById(auctionSessionInfoResponse.get(0).getUserId()).get()));
            } else {
                auctionSessionInfoResponse.get(0).setUser(null);
            }
            auctionSessionInfoDetail.setAuctionSessionInfo(auctionSessionInfoResponse.get(0));
        } else {
            auctionSessionInfoDetail.setAuctionSessionInfo(new AuctionSessionInfoResponse(0L, 0L, "", auctionSessionInfoDetail.getStartingBids(), null));
        }
        return auctionSessionInfoDetail;
    }

    @Transactional
    public AuctionSessionInfoDetail getDetailAuctionSessionByAssetId(String assetId) {
        AuctionSession auctionSession = auctionSessionRepository.getAuctionSessionByAsset_AssetId(assetId);
        auctionSession.getUser().getRoles().size();
        AuctionSessionInfoDetail auctionSessionInfoDetail = auctionSessionRepository.findAuctionSessionInfoDetailById(auctionSession.getAuctionSessionId());
        auctionSessionInfoDetail.setAsset(assetService.getAssetById(auctionSession.getAsset().getAssetId()));

        List<AuctionSessionInfoResponse> auctionSessionInfoResponse = auctionHistoryRepository.findAuctionSessionInfo(auctionSession.getAuctionSessionId());
        if (!auctionSessionInfoResponse.isEmpty()) {
            if (auctionSessionInfoResponse.get(0).getHighestBid().compareTo(BigDecimal.ZERO) == 0) {
                auctionSessionInfoResponse.get(0).setHighestBid(auctionSession.getStartingBids());
            }

            if (auctionSessionInfoResponse.get(0).getUserId() != null) {
                auctionSessionInfoResponse.get(0).setUser(userMapper.toUserResponse(userRepository.findById(auctionSessionInfoResponse.get(0).getUserId()).get()));
            } else {
                auctionSessionInfoResponse.get(0).setUser(null);
            }
            auctionSessionInfoDetail.setAuctionSessionInfo(auctionSessionInfoResponse.get(0));
        } else {
            auctionSessionInfoDetail.setAuctionSessionInfo(new AuctionSessionInfoResponse(0L, 0L, "", auctionSessionInfoDetail.getStartingBids(), null));
        }
        return auctionSessionInfoDetail;
    }

    public List<AuctionSessionResponse> filterAuctionSession(String status, String typeId, String userId, LocalDateTime fromDate, LocalDateTime toDate, BigDecimal minPrice, BigDecimal maxPrice, String keyword, Boolean isInCrease, Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size);

        Specification<AuctionSession> specification = Specification
                .where(AuctionSessionSpecification.hasStatus(status))
                .and(AuctionSessionSpecification.hasTypeId(typeId))
                .and(AuctionSessionSpecification.hasFromDateToDate(fromDate, toDate))
                .and(AuctionSessionSpecification.hasPriceBetween(minPrice, maxPrice))
                .and(AuctionSessionSpecification.hasKeyword(keyword))
                .and(AuctionSessionSpecification.hasUserId(userId))
                .and(AuctionSessionSpecification.hasIsInCrease(isInCrease));

        return auctionSessionRepository.findAll(specification, pageable).stream()
                .map(auctionSession -> {
                    AuctionSessionResponse response = auctionSessionMapper.toAuctionItemResponse(auctionSession);

                    List<AuctionSessionInfoResponse> auctionSessionInfoResponse = auctionHistoryRepository.findAuctionSessionInfo(auctionSession.getAuctionSessionId());
                    if (!auctionSessionInfoResponse.isEmpty()) {
                        if (auctionSessionInfoResponse.get(0).getHighestBid().compareTo(BigDecimal.ZERO) == 0) {
                            auctionSessionInfoResponse.get(0).setHighestBid(auctionSession.getStartingBids());
                        }

                        if (auctionSessionInfoResponse.get(0).getUserId() != null) {
                            auctionSessionInfoResponse.get(0).setUser(userMapper.toUserResponse(userRepository.findById(auctionSessionInfoResponse.get(0).getUserId()).get()));
                        } else {
                            auctionSessionInfoResponse.get(0).setUser(null);
                        }
                        response.setAuctionSessionInfo(auctionSessionInfoResponse.get(0));
                    } else {
                        response.setAuctionSessionInfo(new AuctionSessionInfoResponse(0L, 0L, "", response.getStartingBids(), null));
                    }
                    return response;
                    })
                .toList();
    }

    public int totalAuctionSession(String status, LocalDateTime fromDate, LocalDateTime toDate, String keyword, Boolean isInCrease) {
        if (isAllParamsNullOrEmpty(status, fromDate, toDate, keyword, isInCrease)) {
            return auctionSessionRepository.findAll().size();
        }

        Specification<AuctionSession> specification = Specification
                .where(AuctionSessionSpecification.hasStatus(status))
                .and(AuctionSessionSpecification.hasFromDateToDate(fromDate, toDate))
                .and(AuctionSessionSpecification.hasKeyword(keyword))
                .and(AuctionSessionSpecification.hasIsInCrease(isInCrease));

        return auctionSessionRepository.findAll(specification).size();
    }

    public List<AuctionSessionResponse> filterAuctionSessionRelated(String auctionSessionId) {
        Pageable pageable = PageRequest.of(0, 6);
        AuctionSession session = auctionSessionRepository.findById(auctionSessionId)
                .orElseThrow(() -> new AppException(ErrorCode.AUCTION_SESSION_NOT_EXISTED));
        Specification<AuctionSession> specification = Specification
                .where(RelatedSessionSpecification.hasType(session.getAsset().getType().getTypeId()))
                .and(RelatedSessionSpecification.hasStatus(session.getStatus()))
                .and(RelatedSessionSpecification.hasAuctionSessionNotEqual(auctionSessionId));

        return auctionSessionRepository.findAll(specification, pageable).stream()
                .map(auctionSession -> {
                    AuctionSessionResponse response = auctionSessionMapper.toAuctionItemResponse(auctionSession);

                    List<AuctionSessionInfoResponse> auctionSessionInfoResponse = auctionHistoryRepository.findAuctionSessionInfo(auctionSession.getAuctionSessionId());
                    if (!auctionSessionInfoResponse.isEmpty()) {
                        if (auctionSessionInfoResponse.get(0).getHighestBid().compareTo(BigDecimal.ZERO) == 0) {
                            auctionSessionInfoResponse.get(0).setHighestBid(auctionSession.getStartingBids());
                        }

                        if (auctionSessionInfoResponse.get(0).getUserId() != null) {
                            auctionSessionInfoResponse.get(0).setUser(userMapper.toUserResponse(userRepository.findById(auctionSessionInfoResponse.get(0).getUserId()).get()));
                        } else {
                            auctionSessionInfoResponse.get(0).setUser(null);
                        }
                        response.setAuctionSessionInfo(auctionSessionInfoResponse.get(0));
                    } else {
                        response.setAuctionSessionInfo(new AuctionSessionInfoResponse(0L, 0L, "", response.getStartingBids(), null));
                    }
                    return response;
                })
                .toList();
    }

    public AuctionSessionResponse getAuctionSessionById(String auctionSessionId) {
        return auctionSessionMapper.toAuctionItemResponse(auctionSessionRepository.findById(auctionSessionId)
                .orElseThrow(() -> new AppException(ErrorCode.AUCTION_SESSION_NOT_EXISTED)));
    }

    public List<AuctionSessionResponse> getListAuctionSessionByStatus(String status) {
        return auctionSessionRepository.findAuctionSessionByStatusOrderByStartTimeAsc(status).stream()
                .map(auctionSessionMapper::toAuctionItemResponse)
                .toList();
    }

    private void setAuctionSessionReference(AuctionSessionCreateRequest request, AuctionSession auctionSession) {
        auctionSession.setUser(getUserById(request.getUserId()));
        auctionSession.setAsset(getAssetById(request.getAssetId()));
    }

    User getUserById(String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    }

    Asset getAssetById(String id) {
        return assetRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.ASSET_NOT_EXISTED));
    }

    public boolean isAllParamsNullOrEmpty(String status, LocalDateTime fromDate, LocalDateTime toDate, String keyword, Boolean isInCrease) {
        return (status == null || status.isEmpty()) && fromDate == null  && toDate == null && (keyword == null || keyword.isEmpty()) && isInCrease;
    }
}
