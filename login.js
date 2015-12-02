define([
'libs/text!login.html'
], function (template) {

    var LoginView = Backbone.View.extend({
        template: template,
        el: "#content",
        events: {
            "submit #login-form": "checkLogin"
        },

        checkLogin: function(e) {
            e.preventDefault();
            if($("#username").val() == "kotek.marsjanin.29" && $("#password").val() == "alamakota") {
                //TODO: Komunikat o poprawnym zalogowaniu
                Backbone.history.navigate("home", {trigger: true});
            }
            else {
                alert("Źle!");
            }
        },

        initialize: function () {
            // $.get(this.templateFileName, function(data){console.log(data);this.template=data});
        },
        render: function () {
            $(this.el).html(_.template(this.template));
        }
    });

    return LoginView;
});


