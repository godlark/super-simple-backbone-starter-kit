define([
	'underscore',
	'backbone',
	'text!login.html',
	'knockout',
	'validator'
], function (_, Backbone, template, ko) {

	var LoginView = Backbone.View.extend({
		el: "#content",
		template: _.template(template),
		events: {
			"submit #login-form": "checkLogin"
		},

		initialize: function (notifications) {
			this.notifications = notifications;
			this.viewModel = {};
			this.viewModel.loginError = ko.observable("");
		},

		checkLogin: function (e) {
			e.preventDefault();
			if ($("#username").val() == "kotek.marsjanin.29" && $("#password").val() == "alamakota") {
				this.notifications.success("Sukces", "Zalogowałeś się");
				Backbone.history.navigate("start", {trigger: true});
			}
			else {
				this.viewModel.loginError("Nieprawidłowa nazwa użytkownika bądź hasło.");
			}
		},

		render: function () {
			$(this.el).html(this.template());
			ko.applyBindings(this.viewModel, this.el);
			$("#login-form").validator();
		}
	});

	return LoginView;
});


