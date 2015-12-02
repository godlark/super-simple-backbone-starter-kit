define([
'libs/text!login.html'
], function (template) {

    var LoginView = Backbone.View.extend({
        template: template,
        el: "#content",

        initialize: function () {
            // $.get(this.templateFileName, function(data){console.log(data);this.template=data});
        },
        render: function () {
            $(this.el).html(_.template(this.template));
        }
    });

    return LoginView;
});


