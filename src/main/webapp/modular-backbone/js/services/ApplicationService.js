define([ 'jQuery', 'Underscore', 'Backbone' ], function($, _, Backbone) {

	function ApplicationService() {

		if (arguments.callee._singletonInstance)
			return arguments.callee._singletonInstance;
		arguments.callee._singletonInstance = this;

		var user = null;

		this.getCurrentUser = function() {
			return user;
		},

		this.initialize = function() {
			getCurrentUserFromSpring();
		},

		getCurrentUserFromSpring = function() {

			var auser = $.ajax({
				url : globalsRestUrl + "users/getCurrentUser",
				async : false,
				dataType : 'json',
				success : function(user) {
					return user;
				},
				error : function() {
					// console.log("error")
					return null;
				}
			});

			user = $.parseJSON(auser.responseText);
		},

		this.authenticate = function(userName, password) {
			var auser = $.ajax({
				url : globalsRestUrl + "users/authenticate",
				data : 'userName=' + userName + '&password=' + password,
				type : 'POST',
				async : false,
				dataType : 'json',
				success : function(user) {
					return user;
				},
				error : function() {
					// console.log("error")
					return null;
				}
			});

			user = $.parseJSON(auser.responseText);

		},

		this.logout = function() {
			var auser = $.ajax({
				url : globalsRestUrl + "users/logout",
				type : 'GET',
				async : false,
				success : function(user) {
				},
				error : function() {
				}
			});
		}

		// Blocks the app till unblockApp is called. First blocks the app with no message (blockAppShort) and after a duration it
		// calls blockAppLong with a message and spinner. This is kind a workaround for the reason, that jquerys ajaxStart does it
		// for all ajax calls and if its called, another starting ajax request won't trigger ajax start. And in addition maybe we
		// will have long running ajax calls, which are not be intended to block the gui e.g. loading a big list
		this.blockApp = function() {
			blockAppShort();
			blockAppLong();
		}

		// Blocks the app after 1s with displaying message and spinner.
		blockAppLong = function(options) {
			doBlock = true;
			setTimeout(function() {
				if (doBlock) {
					$.blockUI.defaults.message = "<h1>Please wait...</h1>";
					$.blockUI.defaults.overlayCSS = {
						background : 'url(img/spinner.gif) no-repeat left top',
						position : 'fixed !important',
						width : '100%',
						height : '100%',
						margin : '0px',
						backgroundRepeat : 'no-repeat',
						backgroundAttachment : 'fixed',
						backgroundPosition : '50%',
						cursor : 'wait'
					};
					$.blockUI.defaults.css = {
						padding : 0,
						margin : 0,
						width : '30%',
						top : '38%',
						left : '35%',
						textAlign : 'center',
						color : '#000',
						backgroundColor : 'transparent',
						cursor : 'wait'
					};
					$.blockUI();
				}
			}, 999);
		}

		// Blocks the app immediately
		blockAppShort = function() {
			console.log("ajax request start");
			doBlock = true;
			setTimeout(function() {
				if (doBlock) {
					console.log("locking ui...");
					$.blockUI.defaults.message = "";
					$.blockUI.defaults.overlayCSS = {
						cursor : 'wait'
					};
					$.blockUI.defaults.css = {};
					$.blockUI();
				}
			}, 1);
		}

		this.unblockApp = function() {
			console.log("ajax request end");
			console.log("unlocking...");
			doBlock = false;
			$.unblockUI();
		}
	}

	return new ApplicationService();
});