package com.capstone.project.service;

import java.io.ByteArrayInputStream;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.project.entity.AllowanceEntity;
import com.capstone.project.entity.UserEntity;
import com.capstone.project.helper.AllowanceHelper;
import com.capstone.project.repository.AllowanceRepository;

@Service
public class AllowanceService {
	
	 @Autowired
	  AllowanceRepository allowanceRepository;
	  
	  public ByteArrayInputStream load() {
	    List<AllowanceEntity> allowance = allowanceRepository.findAll();

	    ByteArrayInputStream in = AllowanceHelper.allowanceToCSV(allowance);
	    return in;
	  }
	  
	  public Iterable<AllowanceEntity> getRecords(String pmId) {
          return allowanceRepository.getRecords(pmId);
	  }
	  
	  public AllowanceEntity updateUser(AllowanceEntity User) {
			return allowanceRepository.save(User);
	  }
}
