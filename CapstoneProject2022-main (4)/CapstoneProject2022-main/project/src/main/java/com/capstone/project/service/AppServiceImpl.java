package com.capstone.project.service;

import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.capstone.project.entity.UserEntity;
import com.capstone.project.repository.UserRepository;

@Service
public class AppServiceImpl implements AppService{
	
	@Autowired
	private UserRepository userRepository;
	
	PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	
	@Override
	public UserEntity saveUser(UserEntity user) {
		if(userRepository.existsByUsername(user.getUsername())) {
			throw new RuntimeException("User exists");
		} 
		
		user.setPassword(this.passwordEncoder.encode(user.getPassword()));
		return userRepository.save(user);
	}

	@Override
	public UserEntity searchUser(String username, String password) {
		
		UserEntity user = userRepository.findUser(username);
		if(!Objects.isNull(user)) {
			Boolean passwordMatch = this.passwordEncoder.matches(password,user.getPassword());
			if(passwordMatch)
				return user;
			else
				return null;
		}
		
		else
			return null;
	}

	@Override
	public String findUserByUsername(String username, String password) {
		
		UserEntity user = userRepository.findByUsername(username);
		if(!Objects.isNull(user)) {
			user.setPassword(this.passwordEncoder.encode(password));
			userRepository.save(user);
			return "\"Password reset successful\"";
		}
		
		else
			return "\"Password reset failed\"";
	}
	
	@Override
	public String findUserByUsername(String username, String password, String newPassword) {
		UserEntity user = userRepository.findByUsername(username);
		
		if(!Objects.isNull(user)) {
			Boolean passwordMatch = this.passwordEncoder.matches(password,user.getPassword());
			if(passwordMatch) {
				user.setPassword(this.passwordEncoder.encode(newPassword));
				userRepository.save(user);
				return "\"Password change successful\"";
			}
			
			else
				return "\"Password change failed\"";
		}
		
		else
			return "\"User doesn't exist\"";
	}
	
	@Override
	public Iterable<UserEntity> findAll() {
		return userRepository.findAll();
	}

	@Override
	public UserEntity updateUser(UserEntity User) {
		return userRepository.save(User);
	}
	

}
  
