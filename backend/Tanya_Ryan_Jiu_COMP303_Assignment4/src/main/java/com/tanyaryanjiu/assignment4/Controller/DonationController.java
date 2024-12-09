package com.tanyaryanjiu.assignment4.Controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.tanyaryanjiu.assignment4.Entity.Donation;
import com.tanyaryanjiu.assignment4.Repository.*;

@RestController
@RequestMapping("/donations")
public class DonationController {
    @Autowired
    private DonationRepository donationRepository;

    @PostMapping
    public Donation addDonation(@RequestBody Donation donation) {
        return donationRepository.save(donation);
    }

    @GetMapping
    public List<Donation> getAllDonations() {
        return donationRepository.findAll();
    }

    @GetMapping("/{id}")
    public Donation getDonation(@PathVariable("id") String id) {
        return donationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Donation not found"));
    }

    @PutMapping("/{id}")
    public Donation updateDonation(@PathVariable("id") String id, @RequestBody Donation donation) {
        Donation currentDonation = donationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Donation not found"));
        currentDonation.setStatus(donation.getStatus());
        currentDonation.setQuantityDonated(donation.getQuantityDonated());
        return donationRepository.save(currentDonation);
    }

	
	 @GetMapping("/{id}/history") public List<Donation>
	 getDonorHistory(@PathVariable("id") String id) { return
	 donationRepository.findByDonorId(id); 
	 }
	 
}
