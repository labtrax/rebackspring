define(
		[ 'jQuery', 'Underscore', 'Backbone', 'views/home/main', 'views/about/main', 'services/ApplicationService', 'libs/Tools' ],
		function($, _, Backbone, mainHomeView, aboutView, ApplicationService, Tools) {

			var AppRouter = Backbone.Router.extend({

				initialize : function() {

					console.log();

					userView = null;

					usersView = null;
				},

				routes : {
					'/about' : 'showAbout',
					'/user' : 'showUser',
					'/users' : 'showUsers',
					'/loggedin' : 'loggedin',
					'/logout' : 'logout',
					'/errror' : 'error',
					'/sessionTimeout' : 'sessionTimeout',

					'*actions' : 'defaultAction'
				},

				showUser : function() {
					Tools.resetViewAndNavigation();
					if (userView == null) {
							require([ 'views/user/UserView' ], function(userView) {
								this.userView = userView;
								this.userView.show();
							});
					} else {
						Tools.resetViewAndNavigation();
						userView.show();
					}

				},

				showUsers : function() {
					Tools.resetViewAndNavigation();
					if (usersView == null) {
							require([ 'views/users/UsersView' ], function(usersView) {								
								this.usersView = usersView;
								this.usersView.show();
							});
					} else {
						usersView.show();
					}
				},

				showAbout : function() {
				    ApplicationService.getCurrentUser();
					Tools.resetViewAndNavigation();
					aboutView.show();
				},

				defaultAction : function(actions) {
					Tools.resetViewAndNavigation();
					mainHomeView.show();
				},

				logout : function() {

				},

				loggedin : function() {

				},
				
				error : function() {

				},
				
				sessionTimeout : function() {
					
				}
			});

			var initialize = function() {
				var app_router = new AppRouter;
				Backbone.history.start();
			};

			return {
				initialize : initialize
			};
		});
