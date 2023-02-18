package com.ezekiel.whiskey_reviewer.Repositories;

import com.ezekiel.whiskey_reviewer.Entities.Whiskey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WhiskeyRepository extends JpaRepository<Whiskey, Long> {
}
