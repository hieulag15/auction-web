package com.example.auction_web.controller;

import com.example.auction_web.dto.request.CategoryCreateRequest;
import com.example.auction_web.dto.request.CategoryUpdateRequest;
import com.example.auction_web.dto.request.auth.CategoryFilterRequest;
import com.example.auction_web.dto.response.ApiResponse;
import com.example.auction_web.dto.response.CategoryResponse;
import com.example.auction_web.service.CategoryService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class CategoryController {
    CategoryService categoryService;

    @GetMapping("/{categoryId}")
    ApiResponse<CategoryResponse> getCategory(@PathVariable String categoryId) {
        return ApiResponse.<CategoryResponse>builder()
                .code(HttpStatus.OK.value())
                .result(categoryService.getCategory(categoryId))
                .build();
    }
    @GetMapping
    ApiResponse<List<CategoryResponse>> getAll() {
        return ApiResponse.<List<CategoryResponse>>builder()
                .code(HttpStatus.OK.value())
                .result(categoryService.getAllCategories())
                .build();
    }

    @GetMapping("/filter")
    public ApiResponse<List<CategoryResponse>> filterCategories(
            @RequestParam(required = false) Boolean status,
            @RequestParam(required = false) String keyword) {
        List<CategoryResponse> filteredCategories = categoryService.filterCategories(status, keyword);
        return ApiResponse.<List<CategoryResponse>>builder()
                .code(HttpStatus.OK.value())
                .result(filteredCategories)
                .build();
    }

    @PostMapping
    ApiResponse<CategoryResponse> crateCategory(@ModelAttribute CategoryCreateRequest request) {
        return ApiResponse.<CategoryResponse>builder()
                .code(HttpStatus.OK.value())
                .result(categoryService.createCategory(request))
                .build();
    }

    @PutMapping("/{categoryId}")
    ApiResponse<CategoryResponse> updateCategory(@PathVariable String categoryId, @RequestBody CategoryUpdateRequest request) {
        return ApiResponse.<CategoryResponse>builder()
                .code(HttpStatus.OK.value())
                .result(categoryService.updateCategory(categoryId, request))
                .build();
    }

    @PutMapping("/restore/{categoryId}")
    ApiResponse<String> restoreCategory(@PathVariable String categoryId) {
        categoryService.restoreCategory(categoryId);
        return ApiResponse.<String>builder().result("Category has been restored").build();
    }

    @DeleteMapping("/{categoryId}")
    ApiResponse<String> delete(@PathVariable String categoryId){
        categoryService.deleteCategory(categoryId);
        return ApiResponse.<String>builder().result("Category has been deleted").build();
    }
}
