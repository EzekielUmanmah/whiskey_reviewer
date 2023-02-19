package com.ezekiel.whiskey_reviewer.Services;

import com.ezekiel.whiskey_reviewer.DTOs.ReviewDTO;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface ReviewService {
    @Transactional
    void addReview(ReviewDTO reviewDTO, Long userId, Long whiskeyId);

    @Transactional
    void deleteReviewById(Long reviewId);

    @Transactional
    void updateReviewById(ReviewDTO reviewDTO);

    @Transactional
    List<ReviewDTO> getAllReviewsByUserId(Long userId);

    @Transactional
    List<ReviewDTO> getAllReviewsByWhiskeyId(Long whiskeyId);

    @Transactional
    Optional<ReviewDTO> getReviewById(Long reviewId);
}
