package com.capstone.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.project.entity.AllowanceEntity;
import com.capstone.project.entity.UserEntity;
import com.capstone.project.service.AllowanceService;

@CrossOrigin
@RestController
public class AllowanceController {
	

	  @Autowired
	  AllowanceService fileService;
	  
	  @GetMapping("/download")
	  public ResponseEntity<Resource> getFile() {
	    String filename = "allowance.csv";
	    InputStreamResource file = new InputStreamResource(fileService.load());

	    return ResponseEntity.ok()
	        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
	        .contentType(MediaType.parseMediaType("application/csv"))
	        .body(file);
	  }
	  
	  @GetMapping("/getAllowRec/{pmId}")
      public Iterable<AllowanceEntity> getRecords(@PathVariable String pmId) {
          return fileService.getRecords(pmId);
      }
	  
	  @PutMapping("/updateUser")
		public AllowanceEntity update(@RequestBody AllowanceEntity User) {
			return fileService.updateUser(User);
		}
	  
}
