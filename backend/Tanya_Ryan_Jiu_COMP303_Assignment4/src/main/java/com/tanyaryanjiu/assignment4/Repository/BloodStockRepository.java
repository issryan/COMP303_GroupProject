package com.tanyaryanjiu.assignment4.Repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.tanyaryanjiu.assignment4.Entity.BloodStock;

@Repository
public interface BloodStockRepository extends MongoRepository<BloodStock, String> {
    List<BloodStock> findByBloodGroup(String bloodGroup);
    List<BloodStock> findByDonorId(String donorId);
}