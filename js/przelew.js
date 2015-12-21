define([
	'underscore',
	'backbone',
	'text!przelew.html',
	'knockout'
], function (_, Backbone, template, ko) {

	var PrzelewView = Backbone.View.extend({
		el: "#content",
		template: _.template(template),
		events: {
			"click button": "makeTransaction"
		},
		initialize: function (globalData, sessionData) {
			this.viewModel = {
				"accounts": globalData.accounts
			};

			this.sessionData = sessionData;

			for (var i = 0; i < globalData.accounts.length; i++) {
				this.viewModel.accounts[i] = globalData.accounts[i];
				this.viewModel.accounts[i].id_domestic = globalData.accounts[i].id + "_domestic";
				this.viewModel.accounts[i].id_foreign = globalData.accounts[i].id + "_foreign";
			}
		},
		render: function () {
			$(this.el).html(this.template());
			ko.cleanNode(this.el);
			ko.applyBindings(this.viewModel, this.el);
			this.delegateEvents();
		},
		makeTransaction: function (e) {
			this.sessionData.transaction_from_id = e.target.id;
			Backbone.history.navigate("przelew_formularz", {trigger: true});
		}
	});

	return PrzelewView;
});


