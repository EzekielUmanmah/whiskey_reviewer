package com.ezekiel.whiskey_reviewer.Repositories;

import com.ezekiel.whiskey_reviewer.Entities.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findAllByUserId(Long userId);

    List<Review> findAllByWhiskeyId(Long whiskeyId);
}
