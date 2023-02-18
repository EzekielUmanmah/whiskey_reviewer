package com.ezekiel.whiskey_reviewer.Entities;

import com.ezekiel.whiskey_reviewer.DTOs.ReviewDTO;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "reviews")
@AllArgsConstructor
@NoArgsConstructor
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "text")
    private String comments;

    @Column
    private int rating;

    @ManyToOne
    @JsonBackReference
    private User user;

    @ManyToOne
    @JsonBackReference
    private Whiskey whiskey;

    public Review(ReviewDTO reviewDTO){
        if(reviewDTO.getComments() != null){
            this.comments = reviewDTO.getComments();
        }
        if(reviewDTO.getRating() != -1){
            this.rating = reviewDTO.getRating();
        }
    }
}
