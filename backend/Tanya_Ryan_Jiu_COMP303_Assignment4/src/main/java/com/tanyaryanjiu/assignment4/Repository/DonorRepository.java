package com.tanyaryanjiu.assignment4.Repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.tanyaryanjiu.assignment4.Entity.Donor;

@Repository
public interface DonorRepository extends MongoRepository<Donor, String> {
    List<Donor> findByBloodGroup(String bloodGroup);
}