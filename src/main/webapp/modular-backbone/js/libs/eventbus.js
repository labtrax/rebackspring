define([
  'jQuery',
  'Underscore',
  'Backbone'
], function ($, _, Backbone) {

	 var vent = _.extend({}, Backbone.Events);
    return {
        get: function () { return vent; }
    };
});
