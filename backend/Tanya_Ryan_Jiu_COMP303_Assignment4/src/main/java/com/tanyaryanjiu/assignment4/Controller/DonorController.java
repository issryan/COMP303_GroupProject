package com.tanyaryanjiu.assignment4.Controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.tanyaryanjiu.assignment4.Entity.BloodStock;
import com.tanyaryanjiu.assignment4.Entity.Donor;
import com.tanyaryanjiu.assignment4.Repository.*;
import com.tanyaryanjiu.assignment4.Repository.DonorRepository;

@RestController
@RequestMapping("/donors")
public class DonorController {
    @Autowired
    private DonorRepository donorRepository;
    @Autowired
    private BloodStockRepository bloodStockRepository;

    // Add a new donor
    @PostMapping
    public Donor addDonor(@RequestBody Donor donor) {
        return donorRepository.save(donor);
    }

    // Retrieve all donors from the database
    @GetMapping
    public List<Donor> getAllDonors() {
        return donorRepository.findAll();
    }
    
    // Retrieve a specific donor by ID
    @GetMapping("/{id}")
    public Donor getDonor(@PathVariable String id) {
        return donorRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Donor not found"));
    }

    // Update a donor's details
    @PutMapping("/{id}")
    public Donor updateDonor(@PathVariable String id, @RequestBody Donor donor) {
        Donor currentDonor = donorRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Donor not found"));
        // Update the donor's fields if they are provided (not null)
        if (donor.getFirstName() != null) {
            currentDonor.setFirstName(donor.getFirstName());        }
        if (donor.getLastName() != null) {
            currentDonor.setLastName(donor.getLastName());        }
        if (donor.getAge() >= 0) {  // age should be greater than 0
            currentDonor.setAge(donor.getAge());        }
        if (donor.getBloodGroup() != null) {
            currentDonor.setBloodGroup(donor.getBloodGroup());        }
        if (donor.getCity() != null) {
            currentDonor.setCity(donor.getCity());        }
        if (donor.getPhone() != null) {
            currentDonor.setPhone(donor.getPhone());        }
        if (donor.getDonationHistory() != null) {
            currentDonor.setDonationHistory(donor.getDonationHistory());        }
        return donorRepository.save(currentDonor);
    }

    // Retrieve the blood donation history of a specific donor
    @GetMapping("/{id}/history")
    public List<BloodStock> getDonorHistory(@PathVariable String id) {
        return bloodStockRepository.findByDonorId(id);
    }
}