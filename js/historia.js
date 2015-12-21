define([
	'underscore',
	'backbone',
	'text!historia.html',
	'knockout'
], function (underscore, Backbone, template, ko) {

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


