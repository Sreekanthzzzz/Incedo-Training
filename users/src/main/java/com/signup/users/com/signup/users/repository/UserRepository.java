package com.signup.users.com.signup.users.repository;

import com.signup.users.com.signup.users.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface UserRepository extends JpaRepository<User,String>{
	
	
}
