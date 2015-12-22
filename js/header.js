define([
	'underscore',
	'backbone',
	'text!header.html',
	'knockout',
	'js/notificationsArea',
], function (_, Backbone, template, ko, NotificationsArea) {

	var HeaderView = Backbone.View.extend({
		el: "#header",
		template: _.template(template),

		initialize: function () {
			this.notificationsArea = new NotificationsArea;
			this.viewModel = {};
			this.viewModel.options = ko.observable();
			this.viewModel.currentPlace = ko.observable();
			this.viewModel.signedId = ko.observable(false);
		},

		setMenu: function (options) {
			this.viewModel.options(options);
		},

		setCurrentPlace: function (currentPlace) {
			this.viewModel.currentPlace(currentPlace);
		},

		setSignedIn: function (signedIn) {
			this.viewModel.signedId(signedIn);
		},

		getNotificationsArea: function() {
			return this.notificationsArea;
		},

		render: function () {
			$(this.el).html(this.template());
			ko.applyBindings(this.viewModel, this.el);
			this.notificationsArea.render(this.$el.find('.notifications-container'));
		}
	});

	return HeaderView;
});


