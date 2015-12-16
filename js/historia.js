define([
'backbone',
'text!historia.html',
'knockout'
], function (Backbone, template, ko) {

    var HistoriaView = Backbone.View.extend({
        el: "#content",
        template: template,
        initialize: function () {

        },
        render: function () {
            $(this.el).html(_.template(this.template));
        }
    });

    return HistoriaView;
});


