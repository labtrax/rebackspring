define([ 'Underscore', 'Backbone', 'models/User' ], function(_, Backbone, User) {
	var UserCollection = Backbone.Collection.extend({
		
		model : User,
		
		url : globalsRestUrl + 'users',
		
		initialize : function() {
		}

	});
	
	return UserCollection;
});
