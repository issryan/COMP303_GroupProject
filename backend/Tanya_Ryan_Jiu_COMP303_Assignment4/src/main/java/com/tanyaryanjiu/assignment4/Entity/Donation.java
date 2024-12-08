

package com.tanyaryanjiu.assignment4.Entity;
import java.util.Date;

import org.springframework.data.annotation.*;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.NotBlank;

@Document(collection = "Donation")
public class Donation {
    @Id
    private String id;
    @NotBlank
    private String donorId;
    private String bankId;
    private Date donationDate;
    private String timeSlot;
    private String bloodGroup;
    private int quantityDonated;
    private String status;
    
    // Constructors
    public Donation() {};
    
    public Donation(String id, @NotBlank String donorId, String bankId, Date donationDate, String bloodGroup, String status, String timeSlot, int quantityDonated) {
		this.id = id;
		this.donorId = donorId;
		this.bankId = bankId;
		this.donationDate = donationDate;
		this.bloodGroup = bloodGroup;
		this.status = status;
		this.timeSlot = timeSlot;
		this.quantityDonated = quantityDonated;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getDonorId() {
		return donorId;
	}

	public void setDonorId(String donorId) {
		this.donorId = donorId;
	}

	public String getBankId() {
		return bankId;
	}

	public void setBankId(String bankId) {
		this.bankId = bankId;
	}

	public Date getDonationDate() {
		return donationDate;
	}

	public void setDonationDate(Date donationDate) {
		this.donationDate = donationDate;
	}

	public String getTimeSlot() {
		return timeSlot;
	}

	public void setTimeSlot(String timeSlot) {
		this.timeSlot = timeSlot;
	}

	public String getBloodGroup() {
		return bloodGroup;
	}

	public void setBloodGroup(String bloodGroup) {
		this.bloodGroup = bloodGroup;
	}

	public String getStatus() {
		return status;
	}
	
	public void setStatus(String status) {
		this.status = status;
	}
	
	public int getQuantityDonated() {
		return quantityDonated;
	}
	
	public void setQuantityDonated(int quantityDonated) {
		this.quantityDonated = quantityDonated;
	}
    
	
}
