package com.example.auction_web.service.auth.impl;

import com.example.auction_web.constant.PredefinedRole;
import com.example.auction_web.dto.request.auth.UserCreateRequest;
import com.example.auction_web.dto.request.auth.UserUpdateRequest;
import com.example.auction_web.dto.response.ApiResponse;
import com.example.auction_web.dto.response.AuctionSessionResponse;
import com.example.auction_web.dto.response.auth.UserResponse;
import com.example.auction_web.entity.AuctionSession;
import com.example.auction_web.entity.auth.Role;
import com.example.auction_web.entity.auth.User;
import com.example.auction_web.exception.AppException;
import com.example.auction_web.exception.ErrorCode;
import com.example.auction_web.mapper.AuctionSessionMapper;
import com.example.auction_web.mapper.UserMapper;
import com.example.auction_web.repository.auth.RoleRepository;
import com.example.auction_web.repository.auth.UserRepository;
import com.example.auction_web.service.EmailVerificationTokenService;
import com.example.auction_web.service.FileUploadService;
import com.example.auction_web.service.auth.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserServiceImpl implements UserService {
    UserRepository userRepository;
    RoleRepository roleRepository;
    UserMapper userMapper;
    AuctionSessionMapper auctionSessionMapper;
    PasswordEncoder passwordEncoder;
    FileUploadService fileUploadService;

    EmailVerificationTokenService emailVerificationTokenService;

    @Override
    public UserResponse createUser(UserCreateRequest request) {
        User user = userMapper.toUer(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        HashSet<Role> roles = new HashSet<>();
        roleRepository.findById(PredefinedRole.USER_ROLE).ifPresent(roles::add);

        user.setRoles(roles);
        user.setEnabled(false);

        try {
            user = userRepository.save(user);
            emailVerificationTokenService.sendEmailConfirmation(request.getEmail());
        } catch (DataIntegrityViolationException exception) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        return userMapper.toUserResponse(user);
    }

    public UserResponse getUserResponse(String id) {
        return userMapper.toUserResponse(
                userRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED)));
    }

    public User getUser(String id) {
        return userRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    }

    public UserResponse getUserByUsername(String username) {
        return userMapper.toUserResponse(
                userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED))
        );
    }

    public void updateAvatar(String userId, MultipartFile image) {
        User user = getUser(userId);
        try {
            String imageUrl = fileUploadService.uploadFile(image);
            user.setAvatar(imageUrl);
            userRepository.save(user);
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload image: " + image.getOriginalFilename(), e);
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    public List<UserResponse> getUsers() {
        return userRepository.findAll().stream().map(userMapper::toUserResponse).toList();
    }

    @Override
    public UserResponse getMyInfo() {
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();

        User user = userRepository.findByUsername(name).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        return userMapper.toUserResponse(user);
    }

    @Override
   @PostAuthorize("returnObject.username == authentication.name")
    public UserResponse updateUser(String userId, UserUpdateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        userMapper.updateUser(user, request);

        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        if (request.getAvatar() != null && !request.getAvatar().isEmpty()) {
            try {
                String imageUrl = fileUploadService.uploadFile(request.getAvatar());
                user.setAvatar(imageUrl);
                userRepository.save(user);
            } catch (IOException e) {
                throw new RuntimeException("Failed to upload image: " + request.getAvatar().getOriginalFilename(), e);
            }
        }

        return userMapper.toUserResponse(userRepository.save(user));
    }


    @Override
    public void deleteUser(String userId) {
        userRepository.deleteById(userId);
    }
}
