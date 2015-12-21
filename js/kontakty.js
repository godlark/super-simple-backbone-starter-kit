define([
	'underscore',
	'backbone',
	'text!kontakty.html',
	'knockout'
], function (_, Backbone, template, ko) {

	var KontaktyView = Backbone.View.extend({
		el: "#content",
		template: _.template(template),
		initialize: function () {

		},
		render: function () {
			$(this.el).html(this.template());
		}
	});

	return KontaktyView;
});


