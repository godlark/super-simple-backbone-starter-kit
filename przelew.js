define([
'libs/text!przelew.html',
'knockout'
], function (template, ko) {

    var PrzelewView = Backbone.View.extend({
        el: "#content",
        template: template,
        initialize: function () {

        },
        render: function () {
            $(this.el).html(_.template(this.template));
        }
    });

    return PrzelewView;
});


