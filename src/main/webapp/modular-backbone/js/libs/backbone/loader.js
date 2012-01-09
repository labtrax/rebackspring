define([ 'order!libs/jquery/jquery-1.6.4', 'order!libs/jquery.i18n.properties/jquery.i18n.properties-min-1.0.9',
		'order!libs/jquery/jquery.blockUI', 'order!libs/jquery/jquery-ui-1.8.16.custom.min',
		'order!libs/underscore/underscore-min', 'order!libs/backbone/backbone-min' ], function() {
	
	return {
		Backbone : Backbone.noConflict(),
		_ : _.noConflict(),
		$ : jQuery.noConflict(),
		
	};
});
