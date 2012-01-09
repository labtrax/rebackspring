define([ 'jQuery', 'Underscore', 'Backbone', 'libs/eventbus', 'services/ApplicationService',
		'text!templates/application/HeaderLoggedOut.html', 'text!templates/application/HeaderLoggedIn.html',
		'text!templates/application/HeaderLoggedInAdmin.html' ], function($, _, Backbone, Eventbus, ApplicationService,
		headerLoggedOut, headerLoggedIn, headerLoggedInAdmin) {

	ApplicationView = Backbone.View.extend({

		initialize : function() {

			Eventbus.get().bind("I18N", this.setText);

			$("#loginForm").bind("submit", this.login);
		},

		login : function() {
			ApplicationService.authenticate($("#j_username").val(), $("#j_password").val());
			if (ApplicationService.getCurrentUser() == null) {
				$("#tryAgain").show();
			} else {
				location.hash = "/loggedin";
				location.reload();
			}
			return false;
		},

		render : function() {
			if (ApplicationService.getCurrentUser() == null) {
				$('#header').html(headerLoggedOut);

				$('#dialog_link').click(function() {
					$('#dialogLogin').dialog('open');
					return false;
				});
				$('#dialogLogin').dialog({
					modal : true,
					autoOpen : false,
					width : 600,

				});

			} else {
				var template = "";
				if (ApplicationService.getCurrentUser() != null
						&& ApplicationService.getCurrentUser().currentRole.name == "ROLE_ADMIN") {
					template = headerLoggedInAdmin;
				} else {
					template = headerLoggedIn;
				}
//				require([ includeTemplate ], function(templateHeaderLoggedIn) {
					$('#header').html(template);
					$('#dialog_link').click(function() {
						ApplicationService.logout();
						location.hash = '/logout';
						location.reload();
//					});
				});
			}

		},

		setText : function() {
			$("#login-password").html($.i18n.prop('login-password'));

			$("#dialogLogin").dialog("option", "buttons", [ {
				text : $.i18n.prop('login-login'),
				click : function() {
					$("#loginForm").submit();
				}
			}, {
				text : $.i18n.prop('cancel'),
				click : function() {
					$(this).dialog("close");
				}
			} ]);
		}
	});

	return new ApplicationView;
});