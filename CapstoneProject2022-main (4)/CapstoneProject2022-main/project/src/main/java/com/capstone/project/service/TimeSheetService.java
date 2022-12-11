package com.capstone.project.service;

import java.io.IOException;
import java.text.ParseException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.capstone.project.entity.TimeSheetEntity;
import com.capstone.project.helper.Helper;
import com.capstone.project.repository.TimeSheetRepository;

@Service
public class TimeSheetService {
	
	@Autowired
	TimeSheetRepository repository;
	
	public void save(MultipartFile file) throws ParseException {
	    try 
	    {
	      List<TimeSheetEntity> timeSheetEntitylist = Helper.csvToTutorials(file.getInputStream());
	      repository.saveAll(timeSheetEntitylist);
	    } 
	    
	    catch (IOException e) 
	    {
	      throw new RuntimeException("fail to store csv data: " + e.getMessage());
	    }
	}

	public List<TimeSheetEntity> getAllRecords() {
	    return repository.findAll();
	}
	
	public Iterable<TimeSheetEntity> getProj() {
		return repository.getProj();
	}

	public Iterable<TimeSheetEntity> getProjAdmin(String category) {
		return repository.getProjAdmin(category);
	}

	public Iterable<TimeSheetEntity> getCategory() {
		return repository.getCategory();
	}
	
	public Iterable<TimeSheetEntity> getProj(String managerId) {
			return repository.getProj(managerId);
	}
	
	public Iterable<TimeSheetEntity> getProj(String managerId, String category) {
		return repository.getProj(managerId,category);
	}
	
	public Iterable<TimeSheetEntity> getCategory(String managerId) {
		return repository.getCategory(managerId);
	}
	
	public Iterable<TimeSheetEntity> getRecords(String pname, String pmId) {
		return repository.getRecords(pname,pmId);
	}
	
	public Iterable<TimeSheetEntity> getRecords(String pname, String ps, String pe, String pmId) {
		  	DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM-dd-yyyy",Locale.US);
		  	LocalDate startPeriod = LocalDate.parse(ps, formatter);
		  	LocalDate endPeriod = LocalDate.parse(pe, formatter);
		  	return repository.getRecords(pname,startPeriod,endPeriod,pmId);
	}   

	public Iterable<TimeSheetEntity> getRecords(String pname) {
		return repository.getRecords(pname);
	}
	
	public Iterable<TimeSheetEntity> getRecords(String pname, String ps, String pe) {
		  	DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM-dd-yyyy",Locale.US);
		  	LocalDate startPeriod = LocalDate.parse(ps, formatter);
		  	LocalDate endPeriod = LocalDate.parse(pe, formatter);
		  	return repository.getRecords(pname,startPeriod,endPeriod);
	}
	
	public Iterable<TimeSheetEntity> searchUser(String username) {
			return repository.findUser(username);
	}
	
	public String updateSheet(String Id, TimeSheetEntity sheet) {
		TimeSheetEntity sheetToUpdate = repository.findById(Id).get();
		sheetToUpdate.setAfShiftDays(sheet.getAfShiftDays());
		sheetToUpdate.setNgShiftDays(sheet.getNgShiftDays());
		sheetToUpdate.setApprovalStatus(sheet.getApprovalStatus());
		repository.save(sheetToUpdate);
		return "Update successful";
	}

	
}
