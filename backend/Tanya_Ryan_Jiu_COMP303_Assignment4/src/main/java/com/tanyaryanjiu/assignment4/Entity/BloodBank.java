package com.tanyaryanjiu.assignment4.Entity;
public class BloodBank {
    private int id;
    private String bloodbankName;
    private String address;
    private String city;
    private String phone;
    private String website;
    private String email;
    
    // Constructors
    public BloodBank() {};
    
    public BloodBank(int id, String bloodbankName, String address, String city, String phone, String website,
			String email) {
		super();
		this.id = id;
		this.bloodbankName = bloodbankName;
		this.address = address;
		this.city = city;
		this.phone = phone;
		this.website = website;
		this.email = email;
	}
    
	// Getters and Setters
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getBloodbankName() {
		return bloodbankName;
	}
	public void setBloodbankName(String bloodbankName) {
		this.bloodbankName = bloodbankName;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getWebsite() {
		return website;
	}
	public void setWebsite(String website) {
		this.website = website;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}


}
