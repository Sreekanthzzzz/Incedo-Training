package com.example.demo.services;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.UserDao;
import com.example.demo.entity.User;


@Service
public class UserService {
	@Autowired
	private UserDao userDao;
	
	public User createNewUser(User user) {
		return userDao.save(user);
	}
	
	
	public Iterable<User> getAllUsers(){
		return userDao.findAll();
	}

}
