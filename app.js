require.config({
	paths: {
		text: 'libs/require/text',
		jquery: 'libs/jquery/jquery-2.1.4.min',
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
		'bootstrap': ['jquery']
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
	'js/przelew',
	'js/rachunki',
	'js/start',
	'js/data',
	'js/przelew_formularz',
	'knockout'
], function (Bootstrap, _, Backbone, headerTpl, footerTpl, LoginView, HeaderView, HistoriaView, KontaktyView,
             PrzelewView, RachunkiView, StartView, GlobalData, PrzelewFormularzView, ko) {

	var options = [
		{"url": "#start", "label": "Start", "level": 1},
		{"url": "#przelew", "label": "Zrób przelew", "level": 1},
		{"url": "#rachunki", "label": "Rachunki", "level": 1},
		{"url": "#historia", "label": "Historia transakcji", "level": 1},
		{"url": "#kontakty", "label": "Lista kontaktów", "level": 1},
		{"url": "#przelew_formularz", "label": "Formularz przelewu", "level": 2}
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
			"przelew": "przelew",
			"rachunki": "rachunki",
			"historia": "historia",
			"kontakty": "kontakty",
			"przelew_formularz": "przelew_formularz",
		},
		initialize: function () {
			this.headerView = new HeaderView();
			this.headerView.render();
			this.footerView = new FooterView();
			this.footerView.render();
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
		start: function () {
			this.markMenuOption("start");
			this.signedInCommon();
			this.homeView = new StartView();
			this.homeView.render();
		},
		przelew: function () {
			this.markMenuOption("przelew");
			this.signedInCommon();
			this.homeView = new PrzelewView(GlobalData, sessionData);
			this.homeView.render();
		},
		rachunki: function () {
			this.markMenuOption("rachunki");
			this.signedInCommon();
			this.homeView = new RachunkiView();
			this.homeView.render();
		},
		kontakty: function () {
			this.markMenuOption("kontakty");
			this.signedInCommon();
			this.homeView = new KontaktyView();
			this.homeView.render();
		},
		historia: function () {
			this.markMenuOption("historia");
			this.signedInCommon();
			this.homeView = new HistoriaView();
			this.homeView.render();
		},
		przelew_formularz: function () {
			this.markMenuOption("przelew_formularz");
			this.signedInCommon();
			this.homeView = new PrzelewFormularzView(GlobalData, sessionData);
			this.homeView.render();
		},
		signedInCommon: function () {
			this.headerView.setSignedIn(true);
			this.headerView.setMenu(loggedMenu);
			this.headerView.setCurrentPlace(currentPlace);
			this.countAvailableSum();
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
		},
		login: function () {
			this.loginView = new LoginView();
			this.headerView.setSignedIn(false);
			this.headerView.setMenu(unloggedMenu);
			this.loginView.render();
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


