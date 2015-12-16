define([
'backbone',
'text!kontakty.html',
'knockout'
], function (Backbone, template, ko) {

    var KontaktyView = Backbone.View.extend({
        el: "#content",
        template: template,
        initialize: function () {

        },
        render: function () {
            $(this.el).html(_.template(this.template));
        }
    });

    return KontaktyView;
});


