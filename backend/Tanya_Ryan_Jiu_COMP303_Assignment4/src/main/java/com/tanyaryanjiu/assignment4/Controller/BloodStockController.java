package com.tanyaryanjiu.assignment4.Controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.tanyaryanjiu.assignment4.Entity.BloodStock;
import com.tanyaryanjiu.assignment4.Entity.Donor;
import com.tanyaryanjiu.assignment4.Repository.BloodStockRepository;
import com.tanyaryanjiu.assignment4.Repository.DonorRepository;

@RestController
@RequestMapping("/bloodstocks")
public class BloodStockController {
    @Autowired
    private BloodStockRepository bloodStockRepository;
    @Autowired
    private DonorRepository donorRepository;

    @PostMapping
    public BloodStock addBloodStock(@RequestBody BloodStock bloodStock) {
    	BloodStock savedBloodStock = bloodStockRepository.save(bloodStock);

        // Update donor's donation history
        Donor donor = donorRepository.findById(bloodStock.getDonorId())
            .orElseThrow(() -> new RuntimeException("Donor not found"));
        List<String> donationHistory = donor.getDonationHistory();
        donationHistory.add(savedBloodStock.getId());
        donor.setDonationHistory(donationHistory);
        donorRepository.save(donor);

        return savedBloodStock;
    }

    @GetMapping
    public List<BloodStock> getAllBloodStocks() {
        return bloodStockRepository.findAll();
    }

    @GetMapping("/{id}")
    public BloodStock getBloodStock(@PathVariable String id) {
        return bloodStockRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Blood Stock not found"));
    }

    @PutMapping("/{id}")
    public BloodStock updateBloodStock(@PathVariable String id, @RequestBody BloodStock bloodStock) {
        BloodStock existingBloodStock = bloodStockRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Blood Stock not found"));
        existingBloodStock.setQuantity(bloodStock.getQuantity());
        existingBloodStock.setStatus(bloodStock.getStatus());
        return bloodStockRepository.save(existingBloodStock);
    }

    @GetMapping("/availability/{bloodGroup}")
    public List<BloodStock> checkBloodAvailability(@PathVariable String bloodGroup) {
        return bloodStockRepository.findByBloodGroup(bloodGroup);
    }
}
