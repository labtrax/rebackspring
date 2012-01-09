define([ 'jQuery', 'Underscore', 'Backbone', 'text!templates/users/UsersItemView.html', 'libs/eventbus', 'services/ApplicationService', 'models/User' ],
		function($, _, Backbone, userTemplate, Eventbus, ApplicationService) {

			UsersListItemView = Backbone.View.extend({

				tagName : "li",

				template : _.template(userTemplate),

				events : {
					"click button.userDelete" : "clear"
				},

				initialize : function() {
					this.model.bind("change", this.render, this);
					this.model.bind("destroy", this.remove, this);
				},

				render : function(eventName) {
					$(this.el).html(this.template(this.model.toJSON()));
					return this;
				},

				remove : function() {
					$(this.el).remove();
				},

				clear : function() {
					ApplicationService.getCurrentUser();
					 this.model.destroy();
				}
			});

			// return new AccountListItemView();
		});
