define([
	'underscore',
	'backbone',
	'text!rachunki.html',
	'knockout'
], function (_, Backbone, template, ko) {

	var RachunkiView = Backbone.View.extend({
		el: "#content",
		template: _.template(template),
		initialize: function () {

		},
		render: function () {
			$(this.el).html(this.template());
		}
	});

	return RachunkiView;
});


