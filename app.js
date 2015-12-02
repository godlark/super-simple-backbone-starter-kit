require([
'libs/text!header.html',
'libs/text!home.html',
'libs/text!footer.html',
'login'
], function (headerTpl, homeTpl, footerTpl, LoginView) {

    var ApplicationRouter = Backbone.Router.extend({
        routes: {
            "": "login",
            "*actions": "home"
        },
        initialize: function () {
            this.headerView = new HeaderView();
            this.headerView.render();
            this.footerView = new FooterView();
            this.footerView.render();
        },
        home: function () {
            this.homeView = new HomeView();
            this.homeView.render();
        },
        login: function () {
            this.loginView = new LoginView();
            this.loginView.render();
        }
    });

    var HeaderView = Backbone.View.extend({
        el: "#header",
        templateFileName: "header.html",
        template: headerTpl,

        initialize: function () {
            // $.get(this.templateFileName, function(data){console.log(data);this.template=data});
        },
        render: function () {
            $(this.el).html(_.template(this.template));
        }
    });

    var FooterView = Backbone.View.extend({
        el: "#footer",
        template: footerTpl,
        render: function () {
            this.$el.html(_.template(this.template));
        }
    });

    var HomeView = Backbone.View.extend({
        el: "#content",
        // template: "home.html",
        template: homeTpl,
        initialize: function () {

        },
        render: function () {
            $(this.el).html(_.template(this.template));
        }
    });


    var app = new ApplicationRouter();
    Backbone.history.start();
});


