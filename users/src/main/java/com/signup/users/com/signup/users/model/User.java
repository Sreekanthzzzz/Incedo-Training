package com.signup.users.com.signup.users.model;

import javax.persistence.Entity;

import org.springframework.data.annotation.Id;

@Entity
public class User {
	@Id
	private String id;
	private String name;
	public String getId() {
		return id;
	}
	public User()
	{
		
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
	public String getRole() {
		return Role;
	}
	public void setRole(String role) {
		Role = role;
	}
	private String Role;
	

}
