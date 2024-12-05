package com.tanyaryanjiu.assignment4.Entity;
import org.springframework.data.annotation.*;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.NotBlank;

@Document(collection = "BloodBank")
public class BloodBank {
    @Id
    private String id;
    @NotBlank
    private String name;
    private String address;
    private String city;
    private String phone;
    private String website;
    private String email;
    
    // Constructors
    public BloodBank() {};
    
    public BloodBank(String id, @NotBlank String name, String address, String city, String phone, String website,
			String email) {
		this.id = id;
		this.name = name;
		this.address = address;
		this.city = city;
		this.phone = phone;
		this.website = website;
		this.email = email;
	}
    
	// Getters and Setters
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
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
