package com.capstone.project.helper;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.text.ParseException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.web.multipart.MultipartFile;

import com.capstone.project.entity.TimeSheetEntity;

public class Helper{
	
	public static String TYPE = "text/csv";
	static String[] HEADERs = {"Timesheet Number", "Resource Name", "Resource ID", "Period Start", "Period End", "Hours", "H/L hours", "Afternoon Shift days", "Night Shift days", "Approval Status", "Project Name", "Project Manager", "Manager ID", "Category"};
	
	public static boolean hasCSVFormat(MultipartFile file) {

	    if (!TYPE.equals(file.getContentType())) {
	      return false;
	    }
	    else {

	    return true;
	    }
	}

	public static List<TimeSheetEntity> csvToTutorials(InputStream is) throws ParseException {
		    try (BufferedReader fileReader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
		        CSVParser csvParser = new CSVParser(fileReader,
		            CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());) {

		      List<TimeSheetEntity> timeSheetEntitylist = new ArrayList<TimeSheetEntity>();

		      Iterable<CSVRecord> csvRecords = csvParser.getRecords();
		      
		      for (CSVRecord csvRecord : csvRecords) {
		    	  
		    	  DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy",Locale.US);
		    	  LocalDate startPeriod = LocalDate.parse(csvRecord.get("Period Start"), formatter);
		    	  LocalDate endPeriod = LocalDate.parse(csvRecord.get("Period End"), formatter);
		    	  System.out.println("Inserted " + csvRecord.get("Timesheet Number"));
		          
		    	  TimeSheetEntity timeSheetEntity = new TimeSheetEntity(
		                csvRecord.get("Timesheet Number"),
		                csvRecord.get("Resource Name"),
		                csvRecord.get("Resource ID"),		                
		                csvRecord.get("Hours"),
		                csvRecord.get("H/L hours"),
		                csvRecord.get("Afternoon Shift days"),
		                csvRecord.get("Night Shift days"),
		                csvRecord.get("Approval Status"),
		                csvRecord.get("Project Name"),
		                csvRecord.get("Project Manager"),
		                csvRecord.get("Manager ID"),
		                csvRecord.get("Category"),
		                startPeriod,
		                endPeriod
		              );

		          timeSheetEntitylist.add(timeSheetEntity);
		        }

		        return timeSheetEntitylist;
		      } 
		    
		    catch (IOException e) 
		    {
		        throw new RuntimeException("fail to parse CSV file: " + e.getMessage());
		    }
		  }

	

	


}
