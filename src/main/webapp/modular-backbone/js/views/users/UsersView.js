
define([ 'jQuery', 'Underscore', 'Backbone', 'libs/eventbus', 'models/User', 'collections/UserCollection',
		'views/users/UsersListView' ], function($, _, Backbone, Eventbus, User, UserCollection) {

	UserView = Backbone.View.extend({

		el : $("#page"),

		initialize : function() {

			this.el.append("<div id='users'><ul id='userList'></ul></div>");
			this.content = $("#users");
			this.userList = new UserCollection();
			this.userListView = new UsersListView({
				model : this.userList
			});
			this.userList.fetch();

			this.content.hide();
		},
		show : function() {
			this.content.show();
		}
	});

	return new UserView();
});
