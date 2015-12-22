define([
	'underscore',
	'backbone',
	'knockout',
	'text!notificationsArea.html',
	'jquery_notify'
], function (_, Backbone, ko, layoutTemplate) {
	return Backbone.View.extend({
		template: _.template(layoutTemplate),

		render: function (el) {
			this.setElement(el);
			this.$el.html(this.template());
			this.area = this.$el.find(".notifications-area");
			this.area.notify({
				speed: 500,
				expires: false,
				stack: "below"
			});
		},

		message: function (title, message, type, expires) {
			this.area.notify("create", "notification-" + type, {
				title: title,
				text: message
			}, {
				expires: expires
			});
		},

		info: function (title, message) {
			this.message(title, message, "normal", 10000);
		},

		warning: function (title, message) {
			this.message(title, message, "warning", 15000);
		},

		error: function (title, message) {
			this.message(title, message, "alert", false);
		},

		danger: function (title, message) {
			this.message(title, message, "alert", false);
		},

		success: function (title, message) {
			this.message(title, message, "okay", 5000);
		}
	});
});
