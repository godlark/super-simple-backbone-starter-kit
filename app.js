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
    'js/data',
    'js/przelew_formularz',
    'knockout'
], function (Backbone, headerTpl, footerTpl, LoginView, HeaderView, HistoriaView, KontaktyView,
             PrzelewView, RachunkiView, StartView, GlobalData, PrzelewFormularzView, ko) {

    var loggedMenu = [
        {"_class": ko.observable(), "url": "#start", "label": "Start"},
        {"_class": ko.observable(), "url": "#przelew", "label": "Zrób przelew"},
        {"_class": ko.observable(), "url": "#rachunki", "label": "Rachunki"},
        {"_class": ko.observable(), "url": "#historia", "label": "Historia transakcji"},
        {"_class": ko.observable(), "url": "#kontakty", "label": "Lista kontaktów"}
    ];
    var unloggedMenu = [{"_class": "active", "url": "#", "label": "Logowanie"}];

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
            for (var i = 0; i < loggedMenu.length; i++) {
                if (loggedMenu[i].url == "#" + name) {
                    loggedMenu[i]._class("active");
                } else {
                    loggedMenu[i]._class("");
                }
            }
        },
        start: function () {
            this.markMenuOption("start");
            this.signedInCommon();
            this.setCurrentPlace([{"label": "Start", "url": "#start"}]);
            this.homeView = new StartView();
            this.homeView.render();
        },
        przelew: function () {
            this.markMenuOption("przelew");
            this.signedInCommon();
            this.setCurrentPlace([{"label": "Zrób przelew", "url": "#przelew"}]);
            this.homeView = new PrzelewView(GlobalData, sessionData);
            this.homeView.render();
        },
        rachunki: function () {
            this.markMenuOption("rachunki");
            this.signedInCommon();
            this.setCurrentPlace([{"label": "Rachunki", "url": "#rachunki"}]);
            this.homeView = new RachunkiView();
            this.homeView.render();
        },
        kontakty: function () {
            this.markMenuOption("kontakty");
            this.signedInCommon();
            this.setCurrentPlace([{"label": "Kontakty", "url": "#kontakty"}]);
            this.homeView = new KontaktyView();
            this.homeView.render();
        },
        historia: function () {
            this.markMenuOption("historia");
            this.signedInCommon();
            this.setCurrentPlace([{"label": "Historia transakcji", "url": "#historia"}]);
            this.homeView = new HistoriaView();
            this.homeView.render();
        },
        przelew_formularz: function() {
            this.markMenuOption("przelew_formularz");
            this.signedInCommon();
            this.setCurrentPlace([
                {"label": "Zrób przelew", "url": "#przelew"},
                {"label": "Formularz przelewu", "url": "#przelew_formularz"}
            ]);
            this.homeView = new PrzelewFormularzView(GlobalData, sessionData);
            this.homeView.render();
        },
        signedInCommon: function () {
            this.headerView.setSignedIn(true);
            this.headerView.setMenu(loggedMenu);
            this.countAvailableSum();
        },
        setCurrentPlace: function(currentPlace) {
            for(var i = 0; i < currentPlace.length-1; i++) {
                currentPlace[i]._class = "";
            }
            currentPlace[currentPlace.length-1]._class = "active";
            this.headerView.setCurrentPlace(currentPlace)
        },
        countAvailableSum: function() {
            for(var i = 0; i < GlobalData.accounts.length; i++) {
                var sum = 0;
                for(var j = 0; j < GlobalData.accounts[i].transactions_from.length; j++) {
                    sum += GlobalData.accounts[i].transactions_from[j].value;
                }
                for(j = 0; j < GlobalData.accounts[i].transactions_to.length; j++) {
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


