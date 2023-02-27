package com.ezekiel.whiskey_reviewer.Controllers;

import com.ezekiel.whiskey_reviewer.DTOs.ReviewDTO;
import com.ezekiel.whiskey_reviewer.Services.ReviewServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/review")
public class ReviewController {
    @Autowired
    private ReviewServiceImpl reviewService;
    @PostMapping
    public List<String> addReview(@RequestBody ReviewDTO reviewDTO){
        return reviewService.addReview(reviewDTO);
    }
    @DeleteMapping("/{reviewId}")
    public List<String> deleteReviewById(@PathVariable Long reviewId){
        return reviewService.deleteReviewById(reviewId);
    }
    @PutMapping
    public List<String> updateReviewById(@RequestBody ReviewDTO reviewDTO){
        return reviewService.updateReviewById(reviewDTO);
    }
    @GetMapping
    public Optional<ReviewDTO> getReviewById(@RequestParam Long reviewId){
        return reviewService.getReviewById(reviewId);
    }
    @GetMapping("/user")
    public List<ReviewDTO> getAllReviewsByUserId(@RequestParam Long userId){
        return reviewService.getAllReviewsByUserId(userId);
    }
    @GetMapping("/whiskey")
    public List<ReviewDTO> getAllReviewsByWhiskeyId(@RequestParam Long whiskeyId){
        return reviewService.getAllReviewsByWhiskeyId(whiskeyId);
    }
}
