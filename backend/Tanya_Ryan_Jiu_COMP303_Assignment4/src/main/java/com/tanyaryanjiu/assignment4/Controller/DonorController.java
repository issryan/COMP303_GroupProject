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

    @PostMapping
    public Donor addDonor(@RequestBody Donor donor) {
        return donorRepository.save(donor);
    }

    @GetMapping
    public List<Donor> getAllDonors() {
        return donorRepository.findAll();
    }

    @GetMapping("/{id}")
    public Donor getDonor(@PathVariable String id) {
        return donorRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Donor not found"));
    }

    @PutMapping("/{id}")
    public Donor updateDonor(@PathVariable String id, @RequestBody Donor donor) {
        Donor currentDonor = donorRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Donor not found"));
        currentDonor.setFirstName(donor.getFirstName());
        currentDonor.setLastName(donor.getLastName());
        return donorRepository.save(currentDonor);
    }

    @GetMapping("/{id}/history")
    public List<BloodStock> getDonorHistory(@PathVariable String id) {
        return bloodStockRepository.findByDonorId(id);
    }
}