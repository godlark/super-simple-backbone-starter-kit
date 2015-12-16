define([
'backbone',
'text!header.html',
'knockout'
], function (Backbone, template, ko) {

    var HeaderView = Backbone.View.extend({
        el: "#header",
        template: template,

        initialize: function () {
            this.viewModel = {};
            this.viewModel.options = ko.observable();
            this.viewModel.signedId = ko.observable(false);
        },

        setMenu: function(options) {
            this.viewModel.options(options);
        },

        setSignedIn: function(signedIn) {
            this.viewModel.signedId(signedIn);
        },

        render: function () {
            $(this.el).html(_.template(this.template));
            ko.applyBindings(this.viewModel, this.el);
        }
    });

    return HeaderView;
});


