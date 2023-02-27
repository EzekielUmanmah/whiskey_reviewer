package com.ezekiel.whiskey_reviewer.DTOs;

import com.ezekiel.whiskey_reviewer.Entities.Whiskey;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WhiskeyDTO implements Serializable {
    private Long id;
    private String name;
    private String description;
    private double price;
    private String imgURL;
    private Set<ReviewDTO> reviewDTOSet = new HashSet<>();

    public WhiskeyDTO(Whiskey whiskey){
        if(whiskey.getId() != null){
            this.id = whiskey.getId();
        }
        if(whiskey.getName() != null){
            this.name = whiskey.getName();
        }
        if(whiskey.getDescription() != null){
            this.description = whiskey.getDescription();
        }
        if(whiskey.getPrice() != null){
            this.price = whiskey.getPrice();
        }
        if(whiskey.getImgURL() != null){
            this.imgURL = whiskey.getImgURL();
        }
    }
}
