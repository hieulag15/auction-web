package com.example.auction_web.service;

import com.example.auction_web.dto.request.RequirementCreateRequest;
import com.example.auction_web.dto.request.RequirementUpdateRequest;
import com.example.auction_web.dto.response.RequirementResponse;
import com.example.auction_web.entity.Requirement;

import java.util.List;

public interface RequirementService {
    RequirementResponse createRequirement(RequirementCreateRequest request);
    RequirementResponse updateRequirement(String requirementId, RequirementUpdateRequest request);
    List<RequirementResponse> getAllRequirements();
    List<RequirementResponse> getRequirementsByVendorId(String vendorId);
    List<RequirementResponse> getRequirementsByInspectorId(String inspectorId);
    RequirementResponse getRequirementResponseById(String requirementId);
    Requirement getRequirementById(String requirementId);
    List<RequirementResponse> filterRequirements(Boolean status, String keyword);
}
