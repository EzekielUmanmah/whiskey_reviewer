package com.ezekiel.whiskey_reviewer.DTOs;

import com.ezekiel.whiskey_reviewer.Entities.Review;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDTO implements Serializable {
    private Long id;
    private String comments;
    private int rating;
    private UserDTO userDTO;
    private WhiskeyDTO whiskeyDTO;
    public ReviewDTO(Review review){
        if(review.getId() != null){
            this.id = review.getId();
        }
        if(review.getComments() != null){
            this.comments = review.getComments();
        }
        if(review.getRating() != -1){
            this.rating = review.getRating();
        }
    }
}
