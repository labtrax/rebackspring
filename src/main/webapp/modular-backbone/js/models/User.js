define([ 'jQuery', 'Underscore', 'Backbone', 'services/ApplicationService' ], function($, _, Backbone, ApplicationService) {
	User = Backbone.Model.extend({

		urlRoot : globalsRestUrl + 'users',

		defaults : {
			"id" : null,
			"name" : "",
			"userName" : ""
		},

		saveBlocked : function() {
			ApplicationService.blockApp();
			this.save({}, {
				success : ApplicationService.unblockApp
			});
		}
	});

	return User;
});