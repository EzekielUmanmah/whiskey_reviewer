package com.ezekiel.whiskey_reviewer.Services;

import com.ezekiel.whiskey_reviewer.DTOs.WhiskeyDTO;
import com.ezekiel.whiskey_reviewer.Entities.Whiskey;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface WhiskeyService {
    @Transactional
    List<String> addWhiskey(WhiskeyDTO whiskeyDTO);
    @Transactional
    List<Whiskey> getAllWhiskies();
}
