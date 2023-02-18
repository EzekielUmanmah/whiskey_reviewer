package com.ezekiel.whiskey_reviewer.Entities;

import com.ezekiel.whiskey_reviewer.DTOs.UserDTO;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@Table(name = "users")
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String username;
    @Column(unique = true)
    private String email;
    @Column
    private String password;
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JsonBackReference
    private Set<Review> reviewSet = new HashSet<>();

    public User(UserDTO userDTO){
        if(userDTO.getUsername() != null){
            this.username = userDTO.getUsername();
        }
        if(userDTO.getEmail() != null){
            this.email = userDTO.getEmail();
        }
        if(userDTO.getPassword() != null){
            this.password = userDTO.getPassword();
        }
    }
}
