define([
	'underscore',
	'backbone',
	'text!przelew.html',
	'knockout'
], function (_, Backbone, template, ko) {

	function toMoneyFormat(value) {
		return value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + " zł";
	}

	var PrzelewView = Backbone.View.extend({
		el: "#content",
		template: _.template(template),
		events: {
			"click .transaction-domestic": "makeDomesticTransaction"
		},
		initialize: function (globalData, sessionData) {
			this.viewModel = {
				"accounts": globalData.accounts
			};

			this.sessionData = sessionData;

			for (var i = 0; i < globalData.accounts.length; i++) {
				this.viewModel.accounts[i] = globalData.accounts[i];
				this.viewModel.accounts[i].valueString = toMoneyFormat(globalData.accounts[i].value);
			}
		},
		render: function () {
			$(this.el).html(this.template());
			ko.cleanNode(this.el);
			ko.applyBindings(this.viewModel, this.el);
			this.delegateEvents();
		},
		makeDomesticTransaction: function (e) {
			this.sessionData.transaction_from_id = $(e.target).data("account-id");
			Backbone.history.navigate("przelew_formularz", {trigger: true});
		}
	});

	return PrzelewView;
});


