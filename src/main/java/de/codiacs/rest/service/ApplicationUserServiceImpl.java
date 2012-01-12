package de.codiacs.rest.service;

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
import org.springframework.stereotype.Service;

import de.codiacs.rest.entity.User;

@Service
public class ApplicationUserServiceImpl implements UserDetailsService {

	private Logger logger = LoggerFactory.getLogger(ApplicationUserServiceImpl.class);

	@Autowired
	@Qualifier("org.springframework.security.authentication.ProviderManager#0")
	private ProviderManager authenticationManager;

	@Autowired
	private ShaPasswordEncoder shaPasswordEncoder;

	@Autowired
	private ApplicationUsersService applicationUsersService;

	public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException, DataAccessException {

		if (applicationUsersService.getUser(userName) == null) {

			logger.info("User not found");
		}
		return new UserDetailsImpl(applicationUsersService.getUser(userName));
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
