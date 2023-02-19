package com.ezekiel.whiskey_reviewer.Controllers;

import com.ezekiel.whiskey_reviewer.DTOs.UserDTO;
import com.ezekiel.whiskey_reviewer.Services.UserService;
import com.ezekiel.whiskey_reviewer.Services.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/users")
public class UserController {
    @Autowired
    private UserServiceImpl userService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @PostMapping("/register")
    public List<String> addUser(@RequestBody UserDTO userDTO){
        userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        return userService.addUser(userDTO);
    }
    @PostMapping("/login")
    public List<String> userLogin(@RequestBody UserDTO userDTO){
        return userService.userLogin(userDTO);
    }
}
