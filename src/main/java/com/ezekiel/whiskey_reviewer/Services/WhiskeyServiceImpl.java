package com.ezekiel.whiskey_reviewer.Services;

import com.ezekiel.whiskey_reviewer.DTOs.WhiskeyDTO;
import com.ezekiel.whiskey_reviewer.Entities.Whiskey;
import com.ezekiel.whiskey_reviewer.Repositories.WhiskeyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class WhiskeyServiceImpl implements WhiskeyService {
    @Autowired
    private WhiskeyRepository whiskeyRepository;
    @Override
    @Transactional
    public List<String> addWhiskey(WhiskeyDTO whiskeyDTO){
        List<String> response = new ArrayList<>();

        whiskeyRepository.saveAndFlush(new Whiskey(whiskeyDTO));
        response.add("Whiskey added!");

        return response;
    }
}
