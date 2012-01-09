define([ 'jQuery', 'Underscore', 'Backbone', 'libs/eventbus' ], function($, _, Backbone, Eventbus) {

	var AboutView = Backbone.View.extend({

		el : $("#page"),

		initialize : function(options) {

			Eventbus.get().bind("I18N", this.setText);

			this.el.append("<div id='about'><div>about content</div></div>");
			this.content = $("#about");
			this.content.hide();
		},

		show : function() {

			this.content.show();
		},

		setText : function() {

		}
	});

	return new AboutView();
});
