package com.ezekiel.whiskey_reviewer.Services;

import com.ezekiel.whiskey_reviewer.DTOs.WhiskeyDTO;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface WhiskeyService {
    @Transactional
    List<String> addWhiskey(WhiskeyDTO whiskeyDTO);
}
