package com.ezekiel.whiskey_reviewer.DTOs;

import com.ezekiel.whiskey_reviewer.Entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO implements Serializable {
    private Long id;
    private String username;
    private String password;
    private String email;
    private Set<ReviewDTO> reviewDTOSet = new HashSet<>();

    public UserDTO(User user){
        if(user.getId() != null){
            this.id = user.getId();
        }
        if(user.getUsername() != null){
            this.username = user.getUsername();
        }
        if(user.getEmail() != null){
            this.email = user.getEmail();
        }
        if(user.getPassword() != null){
            this.password = user.getPassword();
        }
    }
}
