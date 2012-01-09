define([ 'jQuery', 'Underscore', 'Backbone', 'text!templates/home/main.html', 'libs/eventbus', 'services/ApplicationService' ],
		function($, _, Backbone, mainHomeTemplate, Eventbus, ApplicationService) {

			var MainHomeView = Backbone.View.extend({

				initialize : function(options) {

					processCounter = 0;

					addMessage = function(message) {
						$("#processes").val($("#processes").val() + message);
					}

					$("#page").append(mainHomeTemplate);
					this.el = $("#main");
					this.el.hide();

					Eventbus.get().bind("I18N", this.setText);
					$("#mainLongRequest").bind("click", this.longRequest);
					$("#mainLongRequestUnblocked").bind("click", this.longRequestUnblocked);

					$("#processes").val("process counter is: " + processCounter);
				},

				show : function() {

					this.el.show();
				},

				longRequestUnblocked : function() {
					processCounter++;
					var processCounterLocal = processCounter;
					addMessage("\nStarting unblocked process with counter " + processCounterLocal + "...");
					$.ajax({
						url : globalsRestUrl + "users/longRequest",
						success : function() {
							addMessage("\nEnding unblocked process with counter " + processCounterLocal);
						}
					});
				},

				longRequest : function() {

					processCounter++;
					var processCounterLocal = processCounter;
					ApplicationService.blockApp();
					addMessage("\nStarting blocked process with counter " + processCounterLocal + "...");
					$.ajax({
						url : globalsRestUrl + "users/longRequest",
						success : function() {
							ApplicationService.unblockApp();
							addMessage("\nEnding blocked process with counter " + processCounterLocal);
						},
					});

				},

				setText : function() {

					$("#message").html($.i18n.prop('message', '<b>' + $.i18n.browserLang() + '</b>'));
				}

			});
			return new MainHomeView();
		});
