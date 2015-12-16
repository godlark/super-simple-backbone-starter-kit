define([
'libs/text!rachunki.html',
'knockout'
], function (template, ko) {

    var RachunkiView = Backbone.View.extend({
        el: "#content",
        template: template,
        initialize: function () {

        },
        render: function () {
            $(this.el).html(_.template(this.template));
        }
    });

    return RachunkiView;
});


