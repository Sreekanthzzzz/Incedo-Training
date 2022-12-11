package com.capstone.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.project.entity.AccessHandler;
import com.capstone.project.entity.AccessHandler2;
import com.capstone.project.entity.UserEntity;
import com.capstone.project.service.AppService;

@CrossOrigin
@RestController
@RequestMapping("/user")
public class Controller {
	@Autowired
	private AppService appService;
	
	
	@PostMapping("/signup")
	public String add(@RequestBody UserEntity user) {
		try {
			appService.saveUser(user);
			return "\"Request sent\"";
		}
		
		catch (RuntimeException e) {
			return "\"" + e.getMessage() + "\"";
		}
	}
	
	@PostMapping("/login")
	public UserEntity login(@RequestBody AccessHandler user) {
			return appService.searchUser(user.getUsername(),user.getPassword());
	}
	
	@PostMapping("/resetPassword")
	public String resetPassword(@RequestBody AccessHandler user) {
			return appService.findUserByUsername(user.getUsername(),user.getPassword());
	}
	
	@PostMapping("/changepassword")
	public String changePassword(@RequestBody AccessHandler2 user) {
			return appService.findUserByUsername(user.getUsername(),user.getPassword());
	}
	
	@GetMapping("/get")
	public Iterable<UserEntity> getAllUsers(){
		return (Iterable<UserEntity>) appService.findAll();
	}
	
	@PutMapping("/update")
	public UserEntity update(@RequestBody UserEntity User) {
		return appService.updateUser(User);
	}
}
