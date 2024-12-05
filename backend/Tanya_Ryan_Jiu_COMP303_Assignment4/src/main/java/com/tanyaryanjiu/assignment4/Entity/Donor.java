
package com.tanyaryanjiu.assignment4.Entity;

import java.util.List;
import org.springframework.data.annotation.*;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.NotBlank;

@Document(collection = "Donor")
public class Donor {
    @Id
    private String id;
    @NotBlank
    private String firstName;
    @NotBlank
    private String lastName;
    private int age;
    @NotBlank
    private String bloodGroup;
    private String city;
    private String phone;
    private List<String> donationHistory; // IDs of blood stocks donated by this donor
    
    // Constructors
    public Donor() {};
    
    public Donor(String id, @NotBlank String firstName, @NotBlank String lastName, int age, @NotBlank String bloodGroup,
			String city, String phone, List<String> donationHistory) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.age = age;
		this.bloodGroup = bloodGroup;
		this.city = city;
		this.phone = phone;
		this.donationHistory = donationHistory;
	}
    
	// Getters and Setters
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public String getBloodGroup() {
		return bloodGroup;
	}
	public void setBloodGroup(String bloodGroup) {
		this.bloodGroup = bloodGroup;
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
	public List<String> getDonationHistory() {
		return donationHistory;
	}
	public void setDonationHistory(List<String> donationHistory) {
		this.donationHistory = donationHistory;
	}
}