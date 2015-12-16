define([
'libs/text!kontakty.html',
'knockout'
], function (template, ko) {

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


