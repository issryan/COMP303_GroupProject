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

    // Add new BloodStock
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

    // Get a list of all BloodStock records
    @GetMapping
    public List<BloodStock> getAllBloodStocks() {
        return bloodStockRepository.findAll();
    }

    // Get a specific blood stock by its ID
    @GetMapping("/{id}")
    public BloodStock getBloodStock(@PathVariable String id) {
        return bloodStockRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Blood Stock not found"));
    }

    // Update an existing blood stock's details (quantity and status).
    @PutMapping("/{id}")
    public BloodStock updateBloodStock(@PathVariable String id, @RequestBody BloodStock bloodStock) {
        BloodStock existingBloodStock = bloodStockRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Blood Stock not found"));
        // Update the existing blood stock fields, allows "partial update"
        if (bloodStock.getBloodGroup() != null) {
            existingBloodStock.setBloodGroup(bloodStock.getBloodGroup());        }
        if (bloodStock.getQuantity() > 0) {
            existingBloodStock.setQuantity(bloodStock.getQuantity());        }
        if (bloodStock.getStatus() != null) {
            existingBloodStock.setStatus(bloodStock.getStatus());        }
        if (bloodStock.getBestBefore() != null) {
            existingBloodStock.setBestBefore(bloodStock.getBestBefore());        }
        if (bloodStock.getDonorId() != null) {
            existingBloodStock.setDonorId(bloodStock.getDonorId());        }
        if (bloodStock.getBloodBankId() != null) {
            existingBloodStock.setBloodBankId(bloodStock.getBloodBankId());        }
        return bloodStockRepository.save(existingBloodStock);
    }

    // Get a list of blood stocks by blood group
    @GetMapping("/bloodgroup/{bloodGroup}")
    public List<BloodStock> checkBloodGroup(@PathVariable String bloodGroup) {
        return bloodStockRepository.findByBloodGroup(bloodGroup);
    }
    
    // Get a list of blood stocks based on their status (Available or Out Of Stock)
    @GetMapping("/status/{status}")
    public List<BloodStock> checkBloodStatus(@PathVariable String status){
    	return bloodStockRepository.findByStatus(status);
    }
}
