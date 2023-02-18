package com.ezekiel.whiskey_reviewer.Repositories;

import com.ezekiel.whiskey_reviewer.Entities.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
