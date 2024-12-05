package com.tanyaryanjiu.assignment4.Entity;

public class BloodStock {
    private int id;
    private String bloodGroup;
    private int quantity;
    private String bestBefore;
    private String status;
    
    // Constructors
    public BloodStock() {};
    
    public BloodStock(int id, String bloodGroup, int quantity, String bestBefore, String status) {
		super();
		this.id = id;
		this.bloodGroup = bloodGroup;
		this.quantity = quantity;
		this.bestBefore = bestBefore;
		this.status = status;
	}
	// Getters and Setters
	public int getId() {
		return id;
	}
	public void setId(int id) {
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
	public String getBestBefore() {
		return bestBefore;
	}
	public void setBestBefore(String bestBefore) {
		this.bestBefore = bestBefore;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}


}