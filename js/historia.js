define([
'backbone',
'text!historia.html',
'knockout'
], function (Backbone, template, ko) {

    var HistoriaView = Backbone.View.extend({
        el: "#content",
        template: _.template(template),
        initialize: function () {

        },
        render: function () {
            $(this.el).html(this.template());
        }
    });

    return HistoriaView;
});


