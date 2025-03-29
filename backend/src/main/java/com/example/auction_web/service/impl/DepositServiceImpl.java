package com.example.auction_web.service.impl;

import com.example.auction_web.dto.request.DepositCreateRequest;
import com.example.auction_web.dto.request.DepositUpdateRequest;
import com.example.auction_web.dto.response.DepositResponse;
import com.example.auction_web.dto.response.UsersJoinSessionResponse;
import com.example.auction_web.entity.AuctionSession;
import com.example.auction_web.entity.BalanceUser;
import com.example.auction_web.entity.Deposit;
import com.example.auction_web.entity.auth.User;
import com.example.auction_web.exception.AppException;
import com.example.auction_web.exception.ErrorCode;
import com.example.auction_web.mapper.AuctionSessionMapper;
import com.example.auction_web.mapper.BalanceUserMapper;
import com.example.auction_web.mapper.DepositMapper;
import com.example.auction_web.repository.AuctionSessionRepository;
import com.example.auction_web.repository.BalanceUserRepository;
import com.example.auction_web.repository.DepositRepository;
import com.example.auction_web.repository.auth.UserRepository;
import com.example.auction_web.service.DepositService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class DepositServiceImpl implements DepositService {
    DepositRepository depositRepository;
    AuctionSessionRepository auctionSessionRepository;
    UserRepository userRepository;
    BalanceUserRepository balanceUserRepository;
    BalanceUserMapper balanceUserMapper;
    DepositMapper depositMapper;
    AuctionSessionMapper auctionSessionMapper;

    @NonFinal
    @Value("${email.username}")
    String EMAIL_ADMIN;

    // create a deposit
    public DepositResponse createDeposit(DepositCreateRequest request) {
        var deposit = depositMapper.toDeposit(request);

        BalanceUser balanceUser = balanceUserRepository.findBalanceUserByUser_UserId(request.getUserId());
        if (balanceUser == null) {
            throw new AppException(ErrorCode.BALANCE_USER_NOT_EXISTED);
        }
        if (balanceUser.getAccountBalance().compareTo(request.getDepositPrice()) < 0) {
            throw new AppException(ErrorCode.BALANCE_NOT_ENOUGH);
        }

        balanceUserRepository.minusBalance(request.getUserId(), request.getDepositPrice());
        balanceUserRepository.increaseBalance(EMAIL_ADMIN, request.getDepositPrice());

        setDepositReference(deposit, request);
        return depositMapper.toDepositResponse(depositRepository.save(deposit));
    }

    // update a deposit
    public DepositResponse updateDeposit(String id, DepositUpdateRequest request) {
        Deposit deposit = depositRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.DEPOSIT_NOT_EXISTED));
        depositMapper.updateDeposit(deposit, request);
        return depositMapper.toDepositResponse(depositRepository.save(deposit));
    }

    public Boolean checkDeposit(String auctionSessionId, String userId) {
        return depositRepository.findByAuctionSession_AuctionSessionIdAndUser_UserId(auctionSessionId, userId) != null;
    }

    // find all deposits
    public List<DepositResponse> findAllDeposits() {
        return depositRepository.findAll().stream()
                .map(depositMapper::toDepositResponse)
                .toList();
    }

    // find deposits by auction item id
    public List<DepositResponse> findDepositByAuctionSessionId(String auctionSession) {
        if (!auctionSessionRepository.existsById(auctionSession)) {
            throw new AppException(ErrorCode.AUCTION_SESSION_NOT_EXISTED);
        }
        return depositRepository.findDepositsByAuctionSession_AuctionSessionId(auctionSession).stream()
                .map(depositMapper::toDepositResponse)
                .toList();
    }

    //  find deposits by user id
    public List<DepositResponse> findDepositByUserId(String userId) {
        if (!userRepository.existsById(userId)) {
            throw new AppException(ErrorCode.USER_NOT_EXISTED);
        }
        return depositRepository.findDepositsByUser_UserId(userId).stream()
                .map(depositMapper::toDepositResponse)
                .toList();
    }

    public List<UsersJoinSessionResponse> getSessionsJoinByUserId(String userId) {
        if (!userRepository.existsById(userId)) {
            throw new AppException(ErrorCode.USER_NOT_EXISTED);
        }
        return depositRepository.findSessionsJoinByUserId(userId).stream()
                .map(usersJoinSessionResponse -> {
                    usersJoinSessionResponse.setAuctionSession(auctionSessionMapper.toAuctionItemResponse(auctionSessionRepository.findById(usersJoinSessionResponse.getSessionId()).orElseThrow()));
                    return usersJoinSessionResponse;
                })
                .toList();
    }

    public BigDecimal maxDepositPriceByAuctionSessionId(String auctionSessionId) {
        return depositRepository.findMaxDepositPriceByAuctionSessionId(auctionSessionId);
    }

    // set deposit reference
    void setDepositReference(Deposit deposit, DepositCreateRequest request) {
        deposit.setAuctionSession(getAuctionSession(request.getAuctionSessionId()));
        deposit.setUser(getUser(request.getUserId()));
    }

    // get auction session
    AuctionSession getAuctionSession(String auctionSession) {
        return auctionSessionRepository.findById(auctionSession)
                .orElseThrow(() -> new AppException(ErrorCode.AUCTION_SESSION_NOT_EXISTED));
    }

    // get user
    User getUser(String userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    }
}
