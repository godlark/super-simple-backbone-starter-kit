require.config({
	paths: {
		text: 'libs/require/text',
		jquery: 'libs/jquery/jquery-1.11.1.min',
		validator: 'libs/validator',
		underscore: 'libs/underscore/underscore-min',
		backbone: 'libs/backbone/backbone-min',
		bootstrap: 'libs/bootstrap/bootstrap.min',
		knockout: 'libs/knockout/knockout-3.4.0',
		q: 'libs/q/q'
	},
	shim: {
		'validator': ['jquery']
	}
});

require([
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
	'knockout'
], function (Backbone, headerTpl, footerTpl, LoginView, HeaderView, HistoriaView, KontaktyView,
			 PrzelewView, RachunkiView, StartView, ko) {

	var loggedMenu = [
		{"_class": ko.observable(), "url": "#start", "label": "Start"},
		{"_class": ko.observable(), "url": "#przelew", "label": "Zrób przelew"},
		{"_class": ko.observable(), "url": "#rachunki", "label": "Rachunki"},
		{"_class": ko.observable(), "url": "#historia", "label": "Historia transakcji"},
		{"_class": ko.observable(), "url": "#kontakty", "label": "Lista kontaktów"}
	];
	var unloggedMenu = [{"_class": "active", "url": "#", "label": "Logowanie"}];

	var rachunki = [
		{
			"name": "Rachunek oszczędnościowo-rozliczeniowy",
			"number": 891000342234221123,
			"transactions": [
				{
					"title": "Początkowa wpłata",
					"value": 1000.0,
					"from_name": "Jan Kowalski",
					"from_address": "Warszawa 00-000, ul. Tysiąclecia 1",
					"from_number": 232348091343298430
				}
			]
		},
		{
			"name": "Rachunek oszczędnościowy",
			"number": 322348091334221123,
			"transactions": [
				{
					"title": "Początkowa wpłata",
					"value": 500.0,
					"from_name": "Joanna Struga-Okoń",
					"from_address": "Warszawa 00-000, ul. Tysiąclecia 2",
					"from_number": 891000342234221123
				}
			]
		}
	];

	var ApplicationRouter = Backbone.Router.extend({
		routes: {
			"": "login",
			"start": "start",
			"przelew": "przelew",
			"rachunki": "rachunki",
			"historia": "historia",
			"kontakty": "kontakty"
		},
		initialize: function () {
			this.headerView = new HeaderView();
			this.headerView.render();
			this.footerView = new FooterView();
			this.footerView.render();
		},
		markMenuOption: function (name) {
			console.log(name);
			for (var i = 0; i < loggedMenu.length; i++) {
				if (loggedMenu[i].url == "#" + name) {
					loggedMenu[i]._class("active");
				} else {
					loggedMenu[i]._class("");
				}
			}
		},
		start: function () {
			this.homeView = new StartView();
			this.markMenuOption("start");
			this.headerView.setSignedIn(true);
			this.headerView.setMenu(loggedMenu);
			this.homeView.render();
		},
		przelew: function () {
			this.homeView = new PrzelewView();
			this.markMenuOption("przelew");
			this.headerView.setSignedIn(true);
			this.headerView.setMenu(loggedMenu);
			this.homeView.render();
		},
		rachunki: function () {
			this.homeView = new RachunkiView();
			this.markMenuOption("rachunki");
			this.headerView.setSignedIn(true);
			this.headerView.setMenu(loggedMenu);
			this.homeView.render();
		},
		kontakty: function () {
			this.homeView = new KontaktyView();
			this.markMenuOption("kontakty");
			this.headerView.setSignedIn(true);
			this.headerView.setMenu(loggedMenu);
			this.homeView.render();
		},
		historia: function () {
			this.homeView = new HistoriaView();
			this.markMenuOption("historia");
			this.headerView.setSignedIn(true);
			this.headerView.setMenu(loggedMenu);
			this.homeView.render();
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


