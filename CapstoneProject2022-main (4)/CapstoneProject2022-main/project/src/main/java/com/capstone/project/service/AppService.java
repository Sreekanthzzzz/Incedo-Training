package com.capstone.project.service;

import com.capstone.project.entity.UserEntity;

public interface AppService {
	public UserEntity saveUser(UserEntity User);
	public UserEntity searchUser(String username, String password);
	public String findUserByUsername(String username, String password); 
	public Iterable<UserEntity> findAll();
	public UserEntity updateUser(UserEntity User);
	public String findUserByUsername(String username, String password, String newPassword);
}
