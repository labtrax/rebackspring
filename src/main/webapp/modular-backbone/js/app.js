define([ 'jQuery', 'Underscore', 'Backbone', 'router', 'libs/eventbus', 'services/ApplicationService', 'views/ApplicationView' ],
		function($, _, Backbone, Router, Eventbus, ApplicationService, ApplicationView) {

			var applicationUser = ApplicationService.getCurrentUser();

			var initialize = function() {

				function loadBundles(lang) {
					jQuery.i18n.properties({
						name : 'Messages',
						path : 'bundle/',
						mode : 'map',
						language : lang,
						callback : function() {
							Eventbus.get().trigger("I18N");
						}
					});
				}

				// rudimentary Ajax exception handling
				$(document).ajaxError(function(e, xhr, options) {
					if (xhr.statusText == "Internal Server Error")
						alert("rest ajaxError server error");
				});

				$(document).ready(function() {
					jQuery('#lang').change(function() {
						var selection = jQuery('#lang option:selected').val();
						loadBundles(selection);
					});
					$('#en').click(function() {
						loadBundles("en");
					});
					$('#de').click(function() {
						loadBundles("de");
					});
				});

				ApplicationService.initialize();

				ApplicationView.render();

				Eventbus.get().bind("I18N", this.setText);

				Router.initialize();

				loadBundles(jQuery.i18n.browserLang());
			}

			return {
				setText : function() {

				},

				initialize : initialize
			};
		});
