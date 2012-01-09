package de.codiacs.rest.service;

import java.io.Serializable;
import java.util.Collection;
import java.util.HashSet;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.GrantedAuthorityImpl;
import org.springframework.security.core.userdetails.UserDetails;

import de.codiacs.rest.entity.User;

public class UserDetailsImpl implements UserDetails, Serializable {

	private static final long serialVersionUID = 3039604969946645418L;

	private User user;

	Collection<GrantedAuthority> authorities = new HashSet<GrantedAuthority>();

	public UserDetailsImpl(User user) {

		this.user = user;
	}

	public User getUser() {

		return user;
	}

	public Collection<GrantedAuthority> getAuthorities() {

		if (user.getCurrentRole() != null ) {
			authorities.add(new GrantedAuthorityImpl(user.getCurrentRole().getName()));
		}
		return authorities;
	}

	@Override
	public String getPassword() {

		return user.getPassword();
	}

	@Override
	public String getUsername() {

		return user.getName();
	}

	@Override
	public boolean isAccountNonExpired() {

		return true;
	}

	@Override
	public boolean isAccountNonLocked() {

		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {

		return true;
	}

	@Override
	public boolean isEnabled() {

		return true;
	}

}
