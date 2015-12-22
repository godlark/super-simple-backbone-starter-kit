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
		initialize: function (globalData) {
			this.viewModel = {
				"accounts": globalData.accounts
			};

			for (var i = 0; i < globalData.accounts.length; i++) {
				this.viewModel.accounts[i] = globalData.accounts[i];
				this.viewModel.accounts[i].valueString = toMoneyFormat(globalData.accounts[i].value);
			}
		},
		render: function () {
			$(this.el).html(this.template());
			ko.cleanNode(this.el);
			ko.applyBindings(this.viewModel, this.el);
		}
	});

	return PrzelewView;
});


