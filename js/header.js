define([
	'underscore',
	'backbone',
	'text!header.html',
	'knockout'
], function (_, Backbone, template, ko) {

	var HeaderView = Backbone.View.extend({
		el: "#header",
		template: _.template(template),

		initialize: function () {
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

		render: function () {
			$(this.el).html(this.template());
			ko.applyBindings(this.viewModel, this.el);
		}
	});

	return HeaderView;
});


