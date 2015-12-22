require.config({
	paths: {
		text: 'libs/require/text',
		jquery: 'libs/jquery/jquery-2.1.4.min',
		jquery_ui: 'libs/jquery-ui/jquery-ui.min',
		jquery_notify: 'libs/jquery-notify/jquery.notify',
		validator: 'libs/validator',
		underscore: 'libs/underscore/underscore-min',
		backbone: 'libs/backbone/backbone-min',
		bootstrap: 'libs/bootstrap/bootstrap.min',
		knockout: 'libs/knockout/knockout-3.4.0',
		q: 'libs/q/q',
		date: 'libs/date'
	},
	shim: {
		'validator': ['jquery'],
		'bootstrap': ['jquery'],
		'jquery_ui': ['jquery'],
		'jquery_notify': ['jquery_ui']
	}
});

require([
	'bootstrap',
	'underscore',
	'backbone',
	'text!header.html',
	'text!footer.html',
	'js/login',
	'js/header',
	'js/historia',
	'js/kontakty',
	'js/rachunki',
	'js/data',
	'js/przelew_krajowy_formularz',
	'knockout'
], function (Bootstrap, _, Backbone, headerTpl, footerTpl, LoginView, HeaderView, HistoriaView, KontaktyView,
             RachunkiView, GlobalData, PrzelewFormularzView, ko) {

	var options = [
		{"url": "#przelew_formularz", "label": "Zrób przelew", "level": 1},
		{"url": "#rachunki", "label": "Rachunki", "level": 1},
		{"url": "#historia", "label": "Historia transakcji", "level": 1},
		{"url": "#kontakty", "label": "Lista kontaktów", "level": 1},
	];

	var loggedMenu = _.map(_.where(options, {"level": 1}), function (option) {
		return _.extend(option, {"_class": ko.observable("")});
	});
	var unloggedMenu = [{"_class": "active", "url": "#", "label": "Logowanie"}];
	var currentPlace = [];

	var sessionData = {};

	var ApplicationRouter = Backbone.Router.extend({
		routes: {
			"": "login",
			"start": "start",
			"rachunki": "rachunki",
			"historia(/*accounts_ids)": "historia",
			"kontakty": "kontakty",
			"przelew_formularz(/:account_id)": "przelew_formularz",
		},
		initialize: function () {
			this.headerView = new HeaderView();
			this.headerView.render();
			this.footerView = new FooterView();
			this.footerView.render();
		},
		login: function () {
			this.loginView = new LoginView(this.headerView.getNotificationsArea());
			this.headerView.setSignedIn(false);
			this.headerView.setMenu(unloggedMenu);
			this.loginView.render();
		},
		rachunki: function () {
			this.markMenuOption("rachunki");
			this.signedInCommon();
			this.homeView = new RachunkiView(GlobalData);
			this.homeView.render();
		},
		kontakty: function () {
			this.markMenuOption("kontakty");
			this.signedInCommon();
			this.homeView = new KontaktyView();
			this.homeView.render();
		},
		historia: function (accounts_ids) {
			if (accounts_ids == null) {
				accounts_ids = "";
			}
			this.markMenuOption("historia");
			this.signedInCommon();
			this.homeView = new HistoriaView(GlobalData, _.map(accounts_ids.split("/").filter(function (v) {
				return v !== '';
			}), function (s) {
				return parseInt(s);
			}));
			this.homeView.render();
		},
		przelew_formularz: function (account_id) {
			this.markMenuOption("przelew_formularz");
			this.signedInCommon();
			this.homeView = new PrzelewFormularzView(GlobalData, account_id, this.headerView.getNotificationsArea());
			this.homeView.render();
		},
		signedInCommon: function () {
			this.headerView.setSignedIn(true);
			this.headerView.setMenu(loggedMenu);
			this.headerView.setCurrentPlace(currentPlace);
			this.countAvailableSum();
		},
		markMenuOption: function (name) {
			var foundIndex = _.findIndex(options, function (option) {
				return option.url == "#" + name;
			});
			if (foundIndex == -1) {
				throw "Exception";
			}

			var level = options[foundIndex].level;
			currentPlace.splice(level - 1, currentPlace.length, _.extend(options[foundIndex]));
			if (level == 1) {
				loggedMenu.forEach(function (val, i, arr) {
					if (arr[i].url == "#" + name) {
						arr[i]._class("active");
					} else {
						arr[i]._class("");
					}
				});
			}
			this.headerView.setCurrentPlace(currentPlace);
		},
		countAvailableSum: function () {
			for (var i = 0; i < GlobalData.accounts.length; i++) {
				var sum = 0;
				for (var j = 0; j < GlobalData.accounts[i].transactions_from.length; j++) {
					sum += GlobalData.accounts[i].transactions_from[j].value;
				}
				for (j = 0; j < GlobalData.accounts[i].transactions_to.length; j++) {
					sum -= GlobalData.accounts[i].transactions_to[j].value;
				}
				GlobalData.accounts[i].value = sum;
			}
		}
	});

	var FooterView = Backbone.View.extend({
		el: "#footer",
		template: footerTpl,
		render: function () {
			this.$el.html(_.template(this.template));
		}
	});

	var app = new ApplicationRouter();
	Backbone.history.start();
});


