define([
'underscore',
'backbone',
'text!login.html',
'knockout',
'validator'
], function (_, Backbone, template, ko) {

    var LoginView = Backbone.View.extend({
        el: "#content",
        template: _.template(template),
        events: {
            "submit #login-form": "checkLogin"
        },

        checkLogin: function(e) {
            e.preventDefault();
            if($("#username").val() == "kotek.marsjanin.29" && $("#password").val() == "alamakota") {
                //TODO: Komunikat o poprawnym zalogowaniu
                Backbone.history.navigate("start", {trigger: true});
            }
            else {
                this.viewModel.loginError("Nieprawidłowa nazwa użytkownika bądź hasło.");
            }
        },

        initialize: function () {
            this.viewModel = {};
            this.viewModel.loginError = ko.observable("");
        },
        render: function () {
            $(this.el).html(this.template());
            ko.applyBindings(this.viewModel, this.el);
            $("#login-form").validator();
        }
    });

    return LoginView;
});


