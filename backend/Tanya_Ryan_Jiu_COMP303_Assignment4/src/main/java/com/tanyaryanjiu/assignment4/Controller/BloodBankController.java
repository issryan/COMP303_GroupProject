package com.tanyaryanjiu.assignment4.Controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.tanyaryanjiu.assignment4.Entity.BloodBank;
import com.tanyaryanjiu.assignment4.Repository.BloodBankRepository;

@RestController
@RequestMapping("/bloodbanks")
public class BloodBankController {
    @Autowired
    private BloodBankRepository bloodBankRepository;

    // Add a new blood bank
    @PostMapping
    public BloodBank addBloodBank(@RequestBody BloodBank bloodBank) {
        return bloodBankRepository.save(bloodBank);
    }

    // Get all blood banks
    @GetMapping
    public List<BloodBank> getAllBloodBanks() {
        return bloodBankRepository.findAll();
    }

    // Get a specific blood bank by ID
    @GetMapping("/{id}")
    public BloodBank getBloodBank(@PathVariable String id) {
        return bloodBankRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Blood Bank not found"));
    }
    
    // Update an existing blood bank's details
    @PutMapping("/{id}")
    public BloodBank updateBloodBank(@PathVariable String id, @RequestBody BloodBank bloodBank) {
        BloodBank existingBloodBank = bloodBankRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Blood Bank not found"));
        if (bloodBank.getName() != null && !bloodBank.getName().isEmpty()) {
            existingBloodBank.setName(bloodBank.getName());        }
        if (bloodBank.getAddress() != null && !bloodBank.getAddress().isEmpty()) {
            existingBloodBank.setAddress(bloodBank.getAddress());        }
        if (bloodBank.getCity() != null && !bloodBank.getCity().isEmpty()) {
            existingBloodBank.setCity(bloodBank.getCity());        }
        if (bloodBank.getPhone() != null && !bloodBank.getPhone().isEmpty()) {
            existingBloodBank.setPhone(bloodBank.getPhone());        }
        if (bloodBank.getWebsite() != null && !bloodBank.getWebsite().isEmpty()) {
            existingBloodBank.setWebsite(bloodBank.getWebsite());        }
        if (bloodBank.getEmail() != null && !bloodBank.getEmail().isEmpty()) {
            existingBloodBank.setEmail(bloodBank.getEmail());        }
        return bloodBankRepository.save(existingBloodBank);
    }
}