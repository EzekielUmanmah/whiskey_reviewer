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
        Optional<User> userOptional = userRepository.findByEmail(userDTO.getEmail());

        if(userOptional.isEmpty()){
            User user = new User(userDTO);
            userRepository.saveAndFlush(user);
            response.add("New user added!");
        } else {
            response.add("An account with this email already exists!");
        }
        return response;
    }
    @Override
    @Transactional
    public List<String> userLogin(UserDTO userDTO){
        List<String> response = new ArrayList<>();
        Optional<User> userOptional = userRepository.findByEmail(userDTO.getEmail());

        if(userOptional.isPresent() && passwordEncoder.matches(userDTO.getPassword(), userOptional.get().getPassword())){
//            response.add("http://localhost:4000/home.html");
            response.add(String.valueOf(userOptional.get().getId()));
//            response.add(String.valueOf(userDTO));
        } else {
            response.add("Invalid email or password.");
        }

        return response;
    }
}
