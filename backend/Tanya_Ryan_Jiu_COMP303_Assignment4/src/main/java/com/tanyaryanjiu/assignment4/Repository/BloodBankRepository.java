package com.tanyaryanjiu.assignment4.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.tanyaryanjiu.assignment4.Entity.BloodBank;

@Repository
public interface BloodBankRepository extends MongoRepository<BloodBank, String> {}
