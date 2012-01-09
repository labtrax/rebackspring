define([ 'jQuery', 'Underscore', 'Backbone' ], function($, _, Backbone) {

	function Tools() {

		if (arguments.callee._singletonInstance)
			return arguments.callee._singletonInstance;
		arguments.callee._singletonInstance = this;

		this.resetViewAndNavigation = function() {
			$("#page > div").hide();
			$("#nav li a").removeClass("selected");
			$("#nav_" + Backbone.history.fragment.replace("/", "")).addClass("selected");

			// if (classWasSet != null && classWasSet.length < 1)
			// $("#nav_").addClass("selected");
		}

		// this.
	}

	return new Tools();
});