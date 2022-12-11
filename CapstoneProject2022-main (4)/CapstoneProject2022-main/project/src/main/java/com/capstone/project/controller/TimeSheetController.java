package com.capstone.project.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.capstone.project.entity.TimeSheetEntity;
import com.capstone.project.helper.Helper;
import com.capstone.project.message.ResponseMessage;
import com.capstone.project.service.TimeSheetService;


@CrossOrigin
@RestController
@RequestMapping("/api/csv")
public class TimeSheetController {
	
	@Autowired
	TimeSheetService service;
	
	@PutMapping("/update/{sheetId}")
	public String updateTimesheet(@PathVariable String sheetId, @RequestBody TimeSheetEntity timeSheet) {
		return service.updateSheet(sheetId,timeSheet);
	}
	
	@PostMapping("/upload")
	public ResponseEntity<ResponseMessage> uploadFile(@RequestParam("file") MultipartFile file) {
		String message = "";

	    if (Helper.hasCSVFormat(file)) {
	      try 
	      {
	        service.save(file);
	        message = "Uploaded the file successfully: " + file.getOriginalFilename();
	        return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
	      } 
	      
	      catch (Exception e) 
	      {
	        message = "Could not upload the file: " + file.getOriginalFilename() + "!";
	        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message + e.getMessage()));
	      }
	    }

	    message = "Please upload a csv file!";
	    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseMessage(message));
	 }
	  
	 @GetMapping("/records")
	 public ResponseEntity<List<TimeSheetEntity>> getAllRecords() {
	    try {
	      List<TimeSheetEntity> timeSheetEntitylist = service.getAllRecords();

	      if (timeSheetEntitylist.isEmpty()) {
	        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	      }

	      return new ResponseEntity<>(timeSheetEntitylist, HttpStatus.OK);
	    } 
	    
	    catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
	 
	 @GetMapping("/getprojadmin")
	 public Iterable<TimeSheetEntity> getProj() {
				return service.getProj();
	 }
	 
	 @GetMapping("/getprojadmin/{category}")
	 public Iterable<TimeSheetEntity> getProjAdmin(@PathVariable String category) {
				return service.getProjAdmin(category);
	 }
	 
	 @GetMapping("/getCategoryadmin")
	 public Iterable<TimeSheetEntity> getCategory() {
		 return service.getCategory();
	 }

	 @GetMapping("/getrecordadmin/{pname}")
	 public Iterable<TimeSheetEntity> getRecord(@PathVariable String pname) {
		 return service.getRecords(pname);
	 }
	 
	 @GetMapping("/getrecordadmin/{pname}/{ps}/{pe}")
	 public Iterable<TimeSheetEntity> getRecord(@PathVariable String pname, @PathVariable String ps, @PathVariable String pe) {
		 return service.getRecords(pname,ps,pe);
	 }
	  
	 @GetMapping("/getproj/{mId}")
	 public Iterable<TimeSheetEntity> getProj(@PathVariable String mId) {
				return service.getProj(mId);
	 }
	 
	 @GetMapping("/getproj/{category}/{mId}")
	 public Iterable<TimeSheetEntity> getProj(@PathVariable String mId, @PathVariable String category) {
				return service.getProj(mId,category);
	 }
	 
	 @GetMapping("/getCategory/{mId}")
	 public Iterable<TimeSheetEntity> getCategory(@PathVariable String mId) {
		 return service.getCategory(mId);
	 }
	 
	 @GetMapping("/getrecord/{pname}/{pmId}")
	 public Iterable<TimeSheetEntity> getRecord(@PathVariable String pname, @PathVariable String pmId) {
		 return service.getRecords(pname,pmId);
	 }
	 
	 @GetMapping("/getrecord/{pname}/{ps}/{pe}/{pmId}")
	 public Iterable<TimeSheetEntity> getRecord(@PathVariable String pname, @PathVariable String ps, @PathVariable String pe, @PathVariable String pmId) {
		 return service.getRecords(pname,ps,pe,pmId);
	 }
		
	 @GetMapping("/getbyname/{user}")
	 public Iterable<TimeSheetEntity> login(@PathVariable String user) {
		 return service.searchUser(user);
		
	 }
}
