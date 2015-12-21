define([
	'underscore',
	'backbone',
	'text!przelew_krajowy_formularz.html',
	'knockout',
	'validator',
	'date',
], function (_, Backbone, template, ko) {

	function NRBvalidatior(nrb) {
		var wagi = [1, 10, 3, 30, 9, 90, 27, 76, 81, 34, 49, 5, 50, 15, 53, 45, 62, 38, 89, 17, 73, 51, 25, 56, 75, 71, 31, 19, 93, 57];
		if (nrb.length != 26) {
			return false;
		}

		nrb = nrb + "2521";
		nrb = nrb.substr(2) + nrb.substr(0, 2);
		var Z = 0;
		for (var i = 0; i < 30; i++) {
			Z += nrb[29 - i] * wagi[i];
		}
		return Z % 97 == 1;
	}

	var PrzelewFormularzView = Backbone.View.extend({
		el: "#content",
		template: _.template(template),
		initialize: function (globalData, sessionData) {
			this.sessionData = sessionData;

			this.viewModel = {};
			this.viewModel.accounts = _.map(globalData.accounts, function(account) {
				return account.id;
			});
			this.viewModel.accountDescription = function(accountNo) {
				console.log(accountNo);
				var account = _.findWhere(globalData.accounts, {id: accountNo});
				return account.name + ", dostępne: " + account.value + " zł; numer: " + account.number;
			};
			this.viewModel.default_account_id = this.sessionData.transaction_from_id;
		},
		render: function () {
			var that = this;

			$(this.el).html(this.template());
			ko.cleanNode(this.el);
			ko.applyBindings(this.viewModel, this.el);
			$("#make-transaction").validator({
				custom: {
					accountnumber: function (el) {
						var number = el.val().replace(/\s+/g, '');
						return NRBvalidatior(number);
					},
					datefuture: function(el) {
						var date = Date.parse(el.val());
						return date != null && date.compareTo(Date.parse('today')) >= 0;
					},
					moneyavailable: function(el) {
						var account = _.findWhere(that.viewModel.accounts, {id: parseInt($("#fromAccount").val())});
						return account.value >= el.val();
					}
				},
				errors: {
					accountnumber: "Nieprawidłowy numer konta bankowego",
					datefuture: "Wybierz datę w przyszłości",
					moneyavailable: "Niewystarczająca ilość środków na koncie",
				}
			})
		}
	});

	return PrzelewFormularzView;
});


