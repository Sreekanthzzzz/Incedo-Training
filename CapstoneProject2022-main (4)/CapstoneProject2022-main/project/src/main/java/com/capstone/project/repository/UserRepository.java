package com.capstone.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.capstone.project.entity.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity,Integer>{
	Boolean existsByUsername(String username);
	
	@Query("SELECT u FROM UserEntity u WHERE u.username = :uname AND u.status = 'Active'")
	UserEntity findUser(@Param("uname") String username);
	
	UserEntity findByUsername(String username);
}