define([
'backbone',
'text!start.html',
'knockout'
], function (Backbone, template, ko) {

    var StartView = Backbone.View.extend({
        el: "#content",
        template: template,
        initialize: function () {

        },
        render: function () {
            $(this.el).html(_.template(this.template));
        }
    });

    return StartView;
});

