package com.examly.springapp.service;

import com.examly.springapp.model.Biketaxi;
import com.examly.springapp.repository.BiketaxiRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BiketaxiService {
    
    @Autowired
    private BiketaxiRepo biketaxiRepo;
    
    public Biketaxi addBiketaxi(Biketaxi biketaxi) {
        return biketaxiRepo.save(biketaxi);
    }
    
    public List<Biketaxi> getAllBiketaxi() {
        return biketaxiRepo.findAll();
    }
}