define([ 'jQuery', 'Underscore', 'Backbone', 'services/ApplicationService', 'text!templates/user/User.html', 'libs/eventbus',
		'models/User' ], function($, _, Backbone, ApplicationService, userTemplate, Eventbus) {

	var UserView = Backbone.View.extend({
		model : User,
		el : $("#page"),

		initialize : function() {

			this.el.append("<div id='user'></div>");
			this.content = $("#user");

			this.content.hide();
			// this.model = ApplicationService.getCurrentUser();
			this.model = new User();
			this.model.set({
				id : ApplicationService.getCurrentUser().id
			});
			this.model.fetch();
			this.model.bind("change", this.render2, this);
			// this.model.bind("change", function() {
			// Eventbus.get().trigger("USER_CHANGED", this.model)
			// });
			this.render2();

			$("#userForm").bind("submit", this.doSave);
		},

		render2 : function() {
			this.compiledTemplate = _.template(userTemplate, this.model.toJSON());
			$("#user").html(this.compiledTemplate);
			$("div.formular").removeClass("red");
			if (this.model.get("violations") != null) {
				for ( var i in this.model.get("violations")) {
					$("#" + this.model.get("violations")[i]).addClass("red");
				}
			}
			Eventbus.get().trigger("USER_CHANGED", this.model)
			// alert(this.model.get("violations"));
		},
		show : function() {
			this.content.show();

		},
		events : {
			"change #userForm input" : "fieldChanged",
			"submit #userForm" : "doSave"
		},
		fieldChanged : function(e) {
			var field = $(e.currentTarget);
			var data = {};
			data[field.attr('id')] = field.val();
			this.model.set(data);
		},
		doSave : function() {
			this.model.save();
			return false;
		}
	});
	return new UserView();
});