package com.capstone.project.repository;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.capstone.project.entity.TimeSheetEntity;

@Repository
public interface TimeSheetRepository extends JpaRepository<TimeSheetEntity,String>{
	
	@Query("SELECT DISTINCT projectName FROM TimeSheetEntity")
	Iterable<TimeSheetEntity> getProj();
	
	@Query("SELECT DISTINCT projectName FROM TimeSheetEntity WHERE category = :category")
	Iterable<TimeSheetEntity> getProjAdmin(@Param("category") String category);
	
	@Query("SELECT DISTINCT category FROM TimeSheetEntity")
	Iterable<TimeSheetEntity> getCategory();
	
	@Query("SELECT u FROM TimeSheetEntity u WHERE u.projectName LIKE :pname AND u.approvalStatus != 'Draft'")
	Iterable<TimeSheetEntity> getRecords(@Param("pname") String projectName);
	
	@Query("SELECT u FROM TimeSheetEntity u WHERE u.projectName LIKE :pname AND u.periodStart = :ps AND u.periodEnd = :pe AND u.approvalStatus != 'Draft'")
	Iterable<TimeSheetEntity> getRecords(@Param("pname") String projectName, @Param("ps") LocalDate periodStart, @Param("pe") LocalDate periodEnd);
	
	@Query("SELECT DISTINCT projectName FROM TimeSheetEntity WHERE managerId = :mId")
	Iterable<TimeSheetEntity> getProj(@Param("mId") String managerId);
	
	@Query("SELECT DISTINCT projectName FROM TimeSheetEntity WHERE managerId = :mId AND category = :category")
	Iterable<TimeSheetEntity> getProj(@Param("mId") String managerId, @Param("category") String category);
	
	@Query("SELECT DISTINCT category FROM TimeSheetEntity WHERE managerId = :mId")
	Iterable<TimeSheetEntity> getCategory(@Param("mId") String managerId);
	
	@Query("SELECT u FROM TimeSheetEntity u WHERE u.projectName LIKE :pname AND u.managerId = :pmId AND u.approvalStatus != 'Draft'")
	Iterable<TimeSheetEntity> getRecords(@Param("pname") String projectName, @Param("pmId") String managerId);
	
	@Query("SELECT u FROM TimeSheetEntity u WHERE u.projectName LIKE :pname AND u.periodStart = :ps AND u.periodEnd = :pe AND u.managerId = :pmId AND u.approvalStatus != 'Draft'")
	Iterable<TimeSheetEntity> getRecords(@Param("pname") String projectName, @Param("ps") LocalDate periodStart, @Param("pe") LocalDate periodEnd, @Param("pmId") String managerId);

	@Query("SELECT u FROM TimeSheetEntity u WHERE u.resourceName = :uname")
	Iterable<TimeSheetEntity> findUser(@Param("uname") String username);
	

}
