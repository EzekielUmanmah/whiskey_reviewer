package com.ezekiel.whiskey_reviewer.Entities;

import com.ezekiel.whiskey_reviewer.DTOs.WhiskeyDTO;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@Table(name = "whiskey")
@AllArgsConstructor
@NoArgsConstructor
public class Whiskey {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String name;

    @Column(columnDefinition = "text", length = 10000)
    private String description;

    @Column
    private Double price;

    @OneToMany(mappedBy = "whiskey", fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JsonBackReference
    private Set<Review> reviewSet = new HashSet<>();

    public Whiskey(WhiskeyDTO whiskeyDTO){
        if(whiskeyDTO.getName() != null){
            this.name = whiskeyDTO.getName();
        }
        if(whiskeyDTO.getDescription() != null){
            this.description = whiskeyDTO.getDescription();
        }
        if(whiskeyDTO.getPrice() != -1){
            this.price = whiskeyDTO.getPrice();
        }
    }
}
