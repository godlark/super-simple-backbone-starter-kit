define([
	'underscore',
	'backbone',
	'text!przelew_formularz.html',
	'knockout'
], function (_, Backbone, template, ko) {

	var PrzelewFormularzView = Backbone.View.extend({
		el: "#content",
		template: _.template(template),
		initialize: function (globalData, sessionData) {
			this.viewModel = {
				"accounts": globalData.accounts
			};

			this.sessionData = sessionData;

			for (var i = 0; i < globalData.accounts.length; i++) {
				this.viewModel.accounts[i] = globalData.accounts[i];
				this.viewModel.accounts[i].description = globalData.accounts[i].name + ", dostępne: "
					+ globalData.accounts[i].value + " zł; numer: " + globalData.accounts[i].number;
			}
		},
		render: function () {
			$(this.el).html(this.template());
			ko.cleanNode(this.el);
			ko.applyBindings(this.viewModel, this.el);
		}
	});

	return PrzelewFormularzView;
});


