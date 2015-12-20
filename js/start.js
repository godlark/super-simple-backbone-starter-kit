define([
'backbone',
'text!start.html',
'knockout'
], function (Backbone, template, ko) {

    var StartView = Backbone.View.extend({
        el: "#content",
        template: _.template(template),
        initialize: function () {

        },
        render: function () {
            $(this.el).html(this.template());
        }
    });

    return StartView;
});


