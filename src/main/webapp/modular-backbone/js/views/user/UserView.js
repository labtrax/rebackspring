define([ 'jQuery', 'Underscore', 'Backbone', 'services/ApplicationService', 'text!templates/user/User.html', 'libs/eventbus',
		'models/User' ], function($, _, Backbone, ApplicationService, userTemplate, Eventbus) {

	var UserView = Backbone.View.extend({
		model : User,
		el : $("#page"),

		initialize : function() {

			this.el.append("<div id='user'><div id='userDetails'></div></div>");
			this.content = $("#user");

			this.content.hide();
			// this.model = ApplicationService.getCurrentUser();
			this.model = new User();
			this.model.set({
				id : ApplicationService.getCurrentUser().id
			});
			this.model.fetch();
			this.model.bind("change", this.render2, this);
			this.render2();
			$('#user').append('<input type="submit" id="saveAccount" class="save" value="save">');
		},

		render2 : function() {
			this.compiledTemplate = _.template(userTemplate, this.model.toJSON());
			$("#userDetails").html(this.compiledTemplate);
			$("div.formular").removeClass("red");
			if (this.model.get("violations") != null) {
				for ( var i in this.model.get("violations")) {
					$('[name="userDetails_' + this.model.get("violations")[i] + '"]').addClass("red");
				}
			}
		},

		show : function() {
			this.content.show();

		},

		events : {
			"click #saveAccount" : "doSave",
			"change #userForm input" : "fieldChanged",
		},

		fieldChanged : function(e) {
			var field = $(e.currentTarget);
			var data = {};
			data[field.attr('name').replace("userDetails_", "")] = field.val();
			this.model.set(data);
			return true;
		},

		doSave : function() {
			this.model.save({}, {
				success : function(model) {
					if (model.get("violations") && model.get("violations").length < 1) {
						Eventbus.get().trigger("USER_CHANGED", model)
					}
				}

			});
			return false;
		},
	});

	return new UserView();
});