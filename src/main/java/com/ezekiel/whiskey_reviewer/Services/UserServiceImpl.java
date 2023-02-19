package com.ezekiel.whiskey_reviewer.Services;

import com.ezekiel.whiskey_reviewer.DTOs.UserDTO;
import com.ezekiel.whiskey_reviewer.Entities.User;
import com.ezekiel.whiskey_reviewer.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Override
    @Transactional
    public List<String> addUser(UserDTO userDTO){
        List<String> response = new ArrayList<>();

        User user = new User(userDTO);
        userRepository.saveAndFlush(user);

        response.add("New user added!");
        return response;
    }
    @Override
    @Transactional
    public List<String> userLogin(UserDTO userDTO){
        List<String> response = new ArrayList<>();
        Optional<User> userOptional = userRepository.findById(userDTO.getId());

        if(userOptional.isPresent() && passwordEncoder.matches(userDTO.getPassword(), userOptional.get().getPassword())){
            response.add("http://localhost:4000/home.html");
            response.add(String.valueOf(userOptional.get().getId()));
        } else {
            response.add("Invalid username or password.");
        }

        return response;
    }
}
