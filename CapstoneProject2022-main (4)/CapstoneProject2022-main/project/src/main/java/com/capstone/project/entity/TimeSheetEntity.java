package com.capstone.project.entity;
import java.time.LocalDate;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="TimeSheetsData")
public class TimeSheetEntity {
	
	@Id
	private String timesheetNumber;
	private String resourceName;
	private String resourceId;
	private String projectHours;
	private String hlHours;
	private String afShiftDays;
	private String ngShiftDays;
	private String approvalStatus;
	private String projectName;
	private String projectManager;
	private String managerId;
	private String category;
	private LocalDate periodStart;
	private LocalDate periodEnd;
	
	public TimeSheetEntity() {
		super();
	}
	
	public TimeSheetEntity(String timesheetNumber, String resourceName, String resourceId, String projectHours, String hlHours, 
			String afShiftDays, String ngShiftDays, String approvalStatus, String projectName, String projectManager, 
			String managerId, String category, LocalDate periodStart, LocalDate periodEnd) 
	{
		this.timesheetNumber = timesheetNumber;
		this.resourceName = resourceName;
		this.resourceId = resourceId;
		this.projectHours = projectHours;
		this.hlHours = hlHours;
		this.afShiftDays = afShiftDays;
		this.ngShiftDays = ngShiftDays;
		this.approvalStatus = approvalStatus;
		this.projectName = projectName;
		this.projectManager = projectManager;
		this.managerId = managerId;
		this.category = category;
		this.periodStart = periodStart;
		this.periodEnd = periodEnd;
	}

	public String getTimesheetNumber() {
		return timesheetNumber;
	}

	public void setTimesheetNumber(String timesheetNumber) {
		this.timesheetNumber = timesheetNumber;
	}

	public String getResourceName() {
		return resourceName;
	}

	public void setResourceName(String resourceName) {
		this.resourceName = resourceName;
	}

	public String getResourceId() {
		return resourceId;
	}

	public void setResourceId(String resourceId) {
		this.resourceId = resourceId;
	}

	public String getProjectHours() {
		return projectHours;
	}

	public void setProjectHours(String projectHours) {
		this.projectHours = projectHours;
	}

	public String getHlHours() {
		return hlHours;
	}

	public void setHlHours(String hlHours) {
		this.hlHours = hlHours;
	}

	public String getAfShiftDays() {
		return afShiftDays;
	}

	public void setAfShiftDays(String afShiftDays) {
		this.afShiftDays = afShiftDays;
	}

	public String getNgShiftDays() {
		return ngShiftDays;
	}

	public void setNgShiftDays(String ngShiftDays) {
		this.ngShiftDays = ngShiftDays;
	}

	public String getApprovalStatus() {
		return approvalStatus;
	}

	public void setApprovalStatus(String approvalStatus) {
		this.approvalStatus = approvalStatus;
	}

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public String getProjectManager() {
		return projectManager;
	}

	public void setProjectManager(String projectManager) {
		this.projectManager = projectManager;
	}

	public String getManagerId() {
		return managerId;
	}

	public void setManagerId(String managerId) {
		this.managerId = managerId;
	}

	public LocalDate getPeriodStart() {
		return periodStart;
	}

	public void setPeriodStart(LocalDate periodStart) {
		this.periodStart = periodStart;
	}

	public LocalDate getPeriodEnd() {
		return periodEnd;
	}

	public void setPeriodEnd(LocalDate periodEnd) {
		this.periodEnd = periodEnd;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}
	

}
