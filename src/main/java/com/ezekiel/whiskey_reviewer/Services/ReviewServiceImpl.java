package com.ezekiel.whiskey_reviewer.Services;

import com.ezekiel.whiskey_reviewer.DTOs.ReviewDTO;
import com.ezekiel.whiskey_reviewer.DTOs.UserDTO;
import com.ezekiel.whiskey_reviewer.DTOs.WhiskeyDTO;
import com.ezekiel.whiskey_reviewer.Entities.Review;
import com.ezekiel.whiskey_reviewer.Entities.User;
import com.ezekiel.whiskey_reviewer.Entities.Whiskey;
import com.ezekiel.whiskey_reviewer.Repositories.ReviewRepository;
import com.ezekiel.whiskey_reviewer.Repositories.UserRepository;
import com.ezekiel.whiskey_reviewer.Repositories.WhiskeyRepository;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReviewServiceImpl implements ReviewService {
    @Autowired
    private EntityManager entityManager;
    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private WhiskeyRepository whiskeyRepository;

    @Override
    @Transactional
    public List<String> addReview(ReviewDTO reviewDTO) {
        List<String> response = new ArrayList<>();
        Optional<User> userOptional = userRepository.findById(reviewDTO.getUserDTO().getId());
        Optional<Whiskey> whiskeyOptional = whiskeyRepository.findById(reviewDTO.getWhiskeyDTO().getId());
        Review review = new Review(reviewDTO);
//        set the review's user and whiskey
//        userOptional.ifPresent(user -> review.setUser(user));
        userOptional.ifPresent(review::setUser);
//        whiskeyOptional.ifPresent(whiskey -> review.setWhiskey(whiskey));
        whiskeyOptional.ifPresent(review::setWhiskey);
        reviewRepository.saveAndFlush(review);
        response.add("Your review has been added!");
        return response;
    }

    @Override
    @Transactional
    public List<String> deleteReviewById(Long reviewId) {
        List<String> response = new ArrayList<>();
        Optional<Review> reviewOptional = reviewRepository.findById(reviewId);
        reviewOptional.ifPresent(review -> reviewRepository.delete(review));
        response.add("Review deleted!");
        return response;
    }

    @Override
    @Transactional
    public List<String> updateReviewById(ReviewDTO reviewDTO) {
        List<String> response = new ArrayList<>();
        Optional<Review> reviewOptional = reviewRepository.findById(reviewDTO.getId());

        reviewOptional.ifPresent(review -> {
            review.setComments(reviewDTO.getComments());
            review.setRating(reviewDTO.getRating());
            reviewRepository.saveAndFlush(review);
        });
        response.add("Review updated!");
        return response;
    }
    @Transactional
    @Override
    public List<ReviewDTO> getAllReviewsByUserId(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            List<Review> reviews = reviewRepository.findAllByUser(user);
            List<ReviewDTO> reviewDTOs = new ArrayList<>();
            for (Review review : reviews) {
                Whiskey whiskey = review.getWhiskey();
                whiskey.getId(); // trigger lazy loading of Whiskey entity
                reviewDTOs.add(new ReviewDTO(review.getId(), review.getComments(), review.getRating(), new UserDTO(user), new WhiskeyDTO(whiskey)));
            }
            return reviewDTOs;
        }
        return Collections.emptyList();
    }

    @Override
    @Transactional
    public List<ReviewDTO> getAllReviewsByWhiskeyId(Long whiskeyId) {
        Optional<Whiskey> whiskeyOptional = whiskeyRepository.findById(whiskeyId);
        if (whiskeyOptional.isPresent()) {
            List<Review> reviewList = reviewRepository.findAllByWhiskeyId(whiskeyId);
            return reviewList.stream().map(review -> new ReviewDTO(review)).collect(Collectors.toList());
        }
        return Collections.emptyList();
    }

    @Override
    @Transactional
    public Optional<ReviewDTO> getReviewById(Long reviewId) {
        Optional<Review> reviewOptional = reviewRepository.findById(reviewId);
        if (reviewOptional.isPresent()) {
            return Optional.of(new ReviewDTO(reviewOptional.get()));
        }
        return Optional.empty();
    }
}
