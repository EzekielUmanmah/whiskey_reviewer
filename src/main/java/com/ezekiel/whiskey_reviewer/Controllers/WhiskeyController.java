package com.ezekiel.whiskey_reviewer.Controllers;

import com.ezekiel.whiskey_reviewer.DTOs.WhiskeyDTO;
import com.ezekiel.whiskey_reviewer.Services.WhiskeyServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/whiskey")
public class WhiskeyController {
    @Autowired
    private WhiskeyServiceImpl whiskeyService;
    @PostMapping
    public List<String> addWhiskey(@RequestBody WhiskeyDTO whiskeyDTO){
        return whiskeyService.addWhiskey(whiskeyDTO);
    }
}
