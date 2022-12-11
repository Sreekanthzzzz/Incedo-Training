package com.capstone.project.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class AllowanceEntity {
	
    @Id
    private String tsn;
	private String name;
	private String sapid;
	private String hours;
	private int lhours;
	private int asfds;
	private int nsds;
	private int dsta;
	private int ta;
	private int total;
	private String status;
	private String pmId;
	
	public AllowanceEntity() {
		super();
		// TODO Auto-generated constructor stub
	}

	public AllowanceEntity(String name, String sapid, String hours, int lhours, int asfds, int nsds, int dsta,
			int ta, int total, String status,String pmId,String tsn) {
		super();
		
		this.name = name;
		this.sapid = sapid;
		this.hours = hours;
		this.lhours = lhours;
		this.asfds = asfds;
		this.nsds = nsds;
		this.dsta = dsta;
		this.ta = ta;
		this.total = total;
		this.status = status;
		this.pmId=pmId;
		this.tsn=tsn;
	}



	public String getTsn() {
		return tsn;
	}

	public void setTsn(String tsn) {
		this.tsn = tsn;
	}

	public String getPmId() {
		return pmId;
	}

	public void setPmId(String pmId) {
		this.pmId = pmId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSapid() {
		return sapid;
	}

	public void setSapid(String sapid) {
		this.sapid = sapid;
	}

	public String getHours() {
		return hours;
	}

	public void setHours(String hours) {
		this.hours = hours;
	}

	public int getLhours() {
		return lhours;
	}

	public void setLhours(int lhours) {
		this.lhours = lhours;
	}

	public int getAsfds() {
		return asfds;
	}

	public void setAsfds(int asfds) {
		this.asfds = asfds;
	}

	public int getNsds() {
		return nsds;
	}

	public void setNsds(int nsds) {
		this.nsds = nsds;
	}

	public int getDsta() {
		return dsta;
	}

	public void setDsta(int dsta) {
		this.dsta = dsta;
	}

	public int getTa() {
		return ta;
	}

	public void setTa(int ta) {
		this.ta = ta;
	}

	public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	  @Override
	  public String toString() {
	    return "AllowanceEntity [name=" + name + ", sapid=" + sapid + ", hours=" + hours + ", lhours=" + lhours + ", asfds=" + asfds+ ", nsds=" + nsds+ ", dsta=" + dsta+ ", ta=" + ta+ ", total=" + total+ ", status=" + status+"]";
	  }
	
	
	

}
