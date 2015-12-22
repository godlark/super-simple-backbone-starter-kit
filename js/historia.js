define([
	'underscore',
	'backbone',
	'text!historia.html',
	'knockout'
], function (underscore, Backbone, template, ko) {

	var HistoriaView = Backbone.View.extend({
		el: "#content",
		template: _.template(template),
		initialize: function (globalData, accountsIds) {
			if (accountsIds.length == 0) {
				console.log("chuj");
				accountsIds = _.map(globalData.accounts, function (account) {
					return account.id;
				});
			}

			this.viewModel = {
				"accounts": globalData.accounts,
				"transactions": []
			};

			for (var i = 0; i < this.viewModel.accounts.length; i++) {
				if (_.contains(accountsIds, this.viewModel.accounts[i].id)) {
					this.viewModel.accounts[i].new_ids = _.without(accountsIds, this.viewModel.accounts[i].id).join("/");
					this.viewModel.accounts[i]._class = "active";
				}
				else {
					this.viewModel.accounts[i].new_ids = [this.viewModel.accounts[i].id].concat(accountsIds).join("/");
					this.viewModel.accounts[i]._class = "";
				}
			}

			for (var i = 0; i < globalData.accounts.length; i++) {
				if (_.contains(accountsIds, globalData.accounts[i].id)) {
					this.viewModel.transactions = this.viewModel.transactions.concat(_.map(globalData.accounts[i].transactions_from, (function (i) {
							return function (t) {
								return {
									"from": t.from_name + "; " + t.from_number + "; " + t.from_address,
									"to": globalData.accounts[i].name,
									"value": t.value,
									"date": t.date,
									"title": t.title,
									"_class": "bg-success"
								}
							}
						})(i)
					));
					this.viewModel.transactions = this.viewModel.transactions.concat(_.map(globalData.accounts[i].transactions_to, (function (i) {
							return function (t) {
								return {
									"to": t.to_name + "; " + t.to_number + "; " + t.to_address,
									"from": globalData.accounts[i].name,
									"value": t.value,
									"date": t.date,
									"title": t.title,
									"_class": "bg-danger"
								}
							}
						})(i)
					));
				}
				this.viewModel.transactions = _.sortBy(this.viewModel.transactions, function(t) {
					return t.date;
				});
			}
		},
		render: function () {
			console.log(this.viewModel);
			$(this.el).html(this.template());
			ko.cleanNode(this.el);
			ko.applyBindings(this.viewModel, this.el);
		}
	});

	return HistoriaView;
});


