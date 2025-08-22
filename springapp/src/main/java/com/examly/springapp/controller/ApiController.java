package com.examly.springapp.controller;

import com.examly.springapp.model.Biketaxi;
import com.examly.springapp.service.BiketaxiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:8081")
public class ApiController {
    
    @Autowired
    private BiketaxiService biketaxiService;
    
    @PostMapping("/addBiketaxi")
    public ResponseEntity<?> addBiketaxi(@RequestBody Biketaxi biketaxi) {
        try {
            Biketaxi savedBiketaxi = biketaxiService.addBiketaxi(biketaxi);
            return new ResponseEntity<>(savedBiketaxi, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/getAllBiketaxi")
    public ResponseEntity<List<Biketaxi>> getAllBiketaxi() {
        try {
            List<Biketaxi> biketaxis = biketaxiService.getAllBiketaxi();
            return new ResponseEntity<>(biketaxis, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    

    

}