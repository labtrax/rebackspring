package de.codiacs.rest.service;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import de.codiacs.rest.entity.Role;
import de.codiacs.rest.entity.User;

@Service
@Scope("session")
public class ApplicationUsersService {

	private Map<Long, User> users = new HashMap<Long, User>();

	@PostConstruct
	public void init() {
		User user1 = new User();
		user1.setId(1l);
		user1.setName("users name");
		user1.setUserName("testuser");
		user1.setPassword("7c57dba07fc8297eee1255a4b14aef69415ccc42");
		user1.setCurrentRole(new Role("ROLE_USER"));

		User admin = new User();
		admin.setId(2l);
		admin.setName("admins name");
		admin.setUserName("admin");
		admin.setPassword("4d75af119789248cd7cfed0ca64be19bfe7650a7");
		admin.setCurrentRole(new Role("ROLE_ADMIN"));

		users.put(user1.getId(), user1);
		users.put(admin.getId(), admin);
	}

	public User getUser(String userName) {

		User user = null;
		for (Map.Entry<Long, User> entry : users.entrySet()) {
			if (entry.getValue().getUserName().equals(userName))
				user = entry.getValue();
		}

		return user;
	}
	
	public Map<Long, User>getUsers() {
		
		return users;
	}

}
