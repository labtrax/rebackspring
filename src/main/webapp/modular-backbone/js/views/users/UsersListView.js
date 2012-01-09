// Filename: views/projects/list
define([ 'jQuery', 'Underscore', 'Backbone', 'libs/eventbus', 'models/User', 'views/users/UsersListItemView' ], function($, _,
		Backbone, Eventbus) {

	UsersListView = Backbone.View.extend({

		el : $('#userList'),

		initialize : function() {

			Eventbus.get().bind("USER_CHANGED", this.test, this);

			this.model.bind("reset", this.render, this);
			this.model.bind("add", function(user) {
				$('#userList').append(new UsersListItemView({
					model : user
				}).render().el);
			});

		},

		render : function(eventName) {
			_.each(this.model.models, function(user) {
				$('#userList').append(new UsersListItemView({
					model : user
				}).render().el);
			}, this);
			return this;
		},
		test : function(user) {
			var testen = _.find(this.model.models, function(it) {
				return it.get("id") == user.get("id")
			});
			testen.fetch();
		}
	});

});
