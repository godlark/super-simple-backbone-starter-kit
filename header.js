define([
'libs/text!header.html',
'knockout'
], function (template, ko) {

    var HeaderView = Backbone.View.extend({
        el: "#header",
        template: template,

        initialize: function () {
            this.viewModel = {};
            this.viewModel.options = ko.observable();
        },

        setMenu: function(options) {
            this.viewModel.options(options);
        },

        render: function () {
            $(this.el).html(_.template(this.template));
            ko.applyBindings(this.viewModel, this.el);
        }
    });

    return HeaderView;
});


