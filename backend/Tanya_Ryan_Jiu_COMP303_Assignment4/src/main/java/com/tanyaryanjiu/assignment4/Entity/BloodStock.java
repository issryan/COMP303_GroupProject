package com.tanyaryanjiu.assignment4.Entity;
import java.util.Date;
import org.springframework.data.annotation.*;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.NotBlank;


@Document(collection = "BloodStock")
public class BloodStock {
    @Id
    private String id;
    @NotBlank
    private String bloodGroup;
    private int quantity;
    private Date bestBefore;
    private String status; // Available or Out Of Stock
    //private String donorId;
    private String bloodBankId;
    
    // Constructors
    public BloodStock() {};
    
    public BloodStock(String id, @NotBlank String bloodGroup, int quantity, Date bestBefore, String status,
		 String bloodBankId) {
		super();
		this.id = id;
		this.bloodGroup = bloodGroup;
		this.quantity = quantity;
		this.bestBefore = bestBefore;
		this.status = status;
		this.bloodBankId = bloodBankId;
	}
    
	// Getters and Setters
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getBloodGroup() {
		return bloodGroup;
	}
	public void setBloodGroup(String bloodGroup) {
		this.bloodGroup = bloodGroup;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public Date getBestBefore() {
		return bestBefore;
	}
	public void setBestBefore(Date bestBefore) {
		this.bestBefore = bestBefore;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getBloodBankId() {
		return bloodBankId;
	}
	public void setBloodBankId(String bloodBankId) {
		this.bloodBankId = bloodBankId;
	}
}
