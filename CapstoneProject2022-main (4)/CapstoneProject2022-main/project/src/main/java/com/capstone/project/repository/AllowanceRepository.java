package com.capstone.project.repository;

import org.springframework.stereotype.Repository;

import com.capstone.project.entity.AllowanceEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface AllowanceRepository extends JpaRepository<AllowanceEntity,Integer> {
	
	@Query("SELECT u FROM AllowanceEntity u WHERE u.pmId = :pmId")
    Iterable<AllowanceEntity> getRecords(@Param("pmId") String managerId);

}
