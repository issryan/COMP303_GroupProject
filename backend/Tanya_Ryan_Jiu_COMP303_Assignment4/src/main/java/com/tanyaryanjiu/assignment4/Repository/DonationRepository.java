package com.tanyaryanjiu.assignment4.Repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.tanyaryanjiu.assignment4.Entity.Donation;

@Repository
public interface DonationRepository extends MongoRepository<Donation, String> {
    List<Donation> findByDonorId(String donorId);
}
