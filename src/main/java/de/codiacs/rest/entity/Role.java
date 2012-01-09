package de.codiacs.rest.entity;

import java.io.Serializable;
import java.util.List;

public class Role {
	
	private String name;

	public Role() {
		
	}
	
	public Role(String name) {
		
		this.name = name;
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
