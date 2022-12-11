package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.User;
import com.example.demo.services.UserService;

@RestController
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@PostMapping({"/signin"})
	public User createNewUser(@RequestBody User user) {
		return userService.createNewUser(user);
		
		
	}
	
	@GetMapping("/get")
	public Iterable<User> getAllUsers(){
		return userService.getAllUsers();
	}
}


