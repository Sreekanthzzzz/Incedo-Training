package com.capstone.project.helper;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Arrays;
import java.util.List;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.apache.commons.csv.QuoteMode;

import com.capstone.project.entity.AllowanceEntity;

public class AllowanceHelper {
	
	  public static ByteArrayInputStream allowanceToCSV(List<AllowanceEntity> allowance) {
		    final CSVFormat format = CSVFormat.DEFAULT.withQuoteMode(QuoteMode.MINIMAL);

		    try (ByteArrayOutputStream out = new ByteArrayOutputStream();
		        CSVPrinter csvPrinter = new CSVPrinter(new PrintWriter(out), format);) {
		      for (AllowanceEntity allowanceEntity : allowance) {
		        List<Object> data = Arrays.asList(
		              String.valueOf(allowanceEntity.getName()),
		              String.valueOf(allowanceEntity.getSapid()),
		              String.valueOf(allowanceEntity.getHours()),
		              allowanceEntity.getLhours(),
		              allowanceEntity.getAsfds(),
		              allowanceEntity.getNsds(),
		              allowanceEntity.getDsta(),
		              allowanceEntity.getTa(),
		              allowanceEntity.getTotal(),
		              String.valueOf(allowanceEntity.getStatus())
		            );

		        csvPrinter.printRecord(data);
		      }

		      csvPrinter.flush();
		      return new ByteArrayInputStream(out.toByteArray());
		    } catch (IOException e) {
		      throw new RuntimeException("fail to import data to CSV file: " + e.getMessage());
		    }
		  }

}
