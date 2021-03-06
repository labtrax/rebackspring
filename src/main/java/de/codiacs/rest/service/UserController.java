package de.codiacs.rest.service;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import de.codiacs.rest.entity.User;

@Controller
public class UserController implements Serializable {

	private static final long serialVersionUID = 7209809651478821994L;

	private Logger logger = LoggerFactory.getLogger(UserController.class);

	private static Validator validator = Validation.buildDefaultValidatorFactory().getValidator();

	@Autowired
	private ApplicationUserServiceImpl applicationUserServiceImpl;

	@Autowired
	private ApplicationUsersService applicationUsersService;

	@PreAuthorize("isAuthenticated()")
	@RequestMapping(value = "/users/{id}", method = RequestMethod.GET)
	public @ResponseBody
	User findOne(@PathVariable Long id, HttpServletRequest request) {

		// We have to to a bit of dirty security here
		if (applicationUserServiceImpl.getCurrentUser().getCurrentRole().getName().equals("ROLE_ADMIN")) {
			return applicationUsersService.getUsers().get(id);
		} else {
			return applicationUserServiceImpl.getCurrentUser();
		}
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@RequestMapping(value = "/users", method = RequestMethod.GET)
	public @ResponseBody
	List<User> findAll() {

		return new ArrayList<User>(applicationUsersService.getUsers().values());
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@RequestMapping(value = "/users", method = RequestMethod.POST)
	public @ResponseBody
	User add(@RequestBody User user) {

		user.setId((long) (Math.random() * 1000));
		return user;
	}

	@PreAuthorize("isAuthenticated()")
	@RequestMapping(value = "/users/{id}", method = RequestMethod.PUT)
	public @ResponseBody
	User update(@PathVariable Long id, @RequestBody User user) {

		// We have to to a bit of dirty security here
		if (!applicationUserServiceImpl.getCurrentUser().getCurrentRole().getName().equals("ROLE_ADMIN")
				&& !applicationUserServiceImpl.getCurrentUser().getId().equals(id)) {
			throw new IllegalAccessError();
		}

		Set<ConstraintViolation<User>> violations = validator.validate(user);
		ArrayList<String> violationsSet = new ArrayList<String>();
		for (Iterator<ConstraintViolation<User>> i = violations.iterator(); i.hasNext();) {
			ConstraintViolation<User> violation = i.next();
			logger.info(violation.toString());
			violationsSet.add(violation.getPropertyPath().toString());
		}

		user.setViolations(violationsSet);

		if (user.getViolations().size() < 1) {
			applicationUsersService.getUsers().put(user.getId(), user);
		}

		return user;
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@RequestMapping(value = "/users/{id}", method = RequestMethod.DELETE)
	@ResponseStatus(value = HttpStatus.OK)
	public @ResponseBody
	void delete(@PathVariable Long id, HttpServletRequest request) {

		applicationUsersService.getUsers().remove(id);
	}

	@RequestMapping(value = "/users/getCurrentUser", method = RequestMethod.GET)
	public @ResponseBody
	User getCurrentUser() {

		return applicationUserServiceImpl.getCurrentUser();
	}

	@RequestMapping(value = "/users/authenticate", method = RequestMethod.POST)
	public @ResponseBody
	User authenticate(HttpServletRequest request) {

		String userName = request.getParameter("userName");
		String password = request.getParameter("password");
		applicationUserServiceImpl.authenticate(userName, password);

		return applicationUserServiceImpl.getCurrentUser();
	}

	@RequestMapping(value = "/users/logout", method = RequestMethod.GET)
	public @ResponseBody
	void logout(HttpServletRequest request) {

		request.getSession(false).invalidate();
		SecurityContextHolder.clearContext();
		request.getSession(true);
	}

	@RequestMapping(value = "/users/longRequest", method = RequestMethod.GET)
	public @ResponseBody
	void longRequest() {

		try {
			Thread.sleep(4000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}

	@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
	@ExceptionHandler({ RuntimeException.class })
	public void handle(Exception e) {

		e.printStackTrace();
	}
}