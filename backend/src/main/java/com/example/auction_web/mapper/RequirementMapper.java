package com.example.auction_web.mapper;

import com.example.auction_web.dto.request.RequirementCreateRequest;
import com.example.auction_web.dto.request.RequirementUpdateRequest;
import com.example.auction_web.dto.response.RequirementResponse;
import com.example.auction_web.entity.Requirement;
import com.example.auction_web.entity.auth.Insprector;
import com.example.auction_web.entity.auth.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface RequirementMapper {
    @Mapping(target = "user", ignore = true)
    Requirement toRequirement(RequirementCreateRequest request);

    @Mapping(target = "vendorId", source = "user", qualifiedByName = "userToString")
    RequirementResponse toRequirementResponse(Requirement requirement);

    void updateRequirement(@MappingTarget Requirement requirement, RequirementUpdateRequest request);

    @Named("userToString")
    default String userToString(User user) {
        return user != null ? user.getUserId() : null;
    }

    @Named("inspectorToString")
    default String inspectorToString(Insprector insprector) {
        return insprector != null ? insprector.getInsprectorId() : null;
    }
}
