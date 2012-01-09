package de.codiacs.rest.service;

import java.util.HashMap;
import java.util.Map;

import javax.print.attribute.HashAttributeSet;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DataAccessException;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.encoding.ShaPasswordEncoder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import de.codiacs.rest.entity.Role;
import de.codiacs.rest.entity.User;

public class ApplicationUserServiceImpl implements UserDetailsService {

	private Logger logger = LoggerFactory.getLogger(ApplicationUserServiceImpl.class);

	@Autowired
	@Qualifier("org.springframework.security.authentication.ProviderManager#0")
	private ProviderManager authenticationManager;

	@Autowired
	private ShaPasswordEncoder shaPasswordEncoder;

	public static Map<Long, User> users = new HashMap();

	static {
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

	private static User getUser(String userName) {

		User user = null;
		for (Map.Entry<Long, User> entry : users.entrySet()) {
			if (entry.getValue().getUserName().equals(userName))
				user = entry.getValue();
		}

		return user;
	}

	public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException, DataAccessException {

		if (getUser(userName) == null) {

			logger.info("User not found");
		}
		return new UserDetailsImpl(getUser(userName));
	}

	public Authentication authenticate() {

		Authentication auth = null;

		UserDetails userDetails = loadUserByUsername("");
		auth = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

		SecurityContextHolder.getContext().setAuthentication(auth);

		return auth;
	}

	public Authentication authenticate(String username, String password) {

		SecurityContextHolder.clearContext();

		Authentication auth = null;

		try {
			UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(username, password);
			auth = authenticationManager.authenticate(token);
		} catch (Exception e) {
			e.printStackTrace();
		}

		if (null != auth) {
			SecurityContextHolder.getContext().setAuthentication(auth);
		} else {
			return null;
		}

		return auth;
	}

	public String encodePassword(String password, String username) {

		return shaPasswordEncoder.encodePassword(password, username);
	}

	public User getCurrentUser() {

		if (SecurityContextHolder.getContext().getAuthentication() != null
				&& SecurityContextHolder.getContext().getAuthentication().getPrincipal() != null
				&& SecurityContextHolder.getContext().getAuthentication().getPrincipal() instanceof UserDetails)
			return ((UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUser();
		return null;
	}
}
