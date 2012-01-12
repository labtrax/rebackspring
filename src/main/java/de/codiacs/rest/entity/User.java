package de.codiacs.rest.entity;

import java.io.Serializable;
import java.util.ArrayList;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

//@JsonIgnoreProperties({"password"})
public class User implements Serializable{

	private static final long serialVersionUID = -3913802217749427955L;

	private Long id;

	private String userName;

	@NotNull
	@Length(min = 10, max = 30)
	private String name;
	
	private Long lastModified;
	
	private String password;

	private Role currentRole;
	
	private ArrayList<String> violations;

	public String getUserName() {
		return userName;
	}

	public void setUserName(String username) {
		this.userName = username;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

//	@JsonIgnore 
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public ArrayList<String> getViolations() {
		return violations;
	}

	public void setViolations(ArrayList<String> violations) {
		this.violations = violations;
	}

	public Long getLastModified() {
		return lastModified;
	}

	public void setLastModified(Long lastModified) {
		this.lastModified = lastModified;
	}

	public Role getCurrentRole() {
		return currentRole;
	}

	public void setCurrentRole(Role currentRole) {
		this.currentRole = currentRole;
	}
}
