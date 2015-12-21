define([
	'knockout'
], function (ko) {

	var nr = "89 2490 1044 0000 4200 4974 5654";

	var globalData =
	{
		"accounts": [
			{
				"name": "Rachunek oszczędnościowo-rozliczeniowy",
				"number": 891000342234221123,
				"id": 1,
				"transactions_to": [
					{
						"title": "Początkowa wpłata",
						"value": 500.0,
						"to_name": "Joanna Struga-Okoń",
						"to_address": "Warszawa 00-000, ul. Tysiąclecia 2",
						"to_number": 891000342234221123
					}
				],
				"transactions_from": [
					{
						"title": "Początkowa wpłata",
						"value": 1000.0,
						"from_name": "Jan Kowalski",
						"from_address": "Warszawa 00-000, ul. Tysiąclecia 1",
						"from_number": 232348091343298430
					}
				]
			},
			{
				"name": "Rachunek oszczędnościowy",
				"number": 322348091334221123,
				"id": 2,
				"transactions_to": [],
				"transactions_from": [
					{
						"title": "Początkowa wpłata",
						"value": 500.0,
						"from_name": "Joanna Struga-Okoń",
						"from_address": "Warszawa 00-000, ul. Tysiąclecia 2",
						"from_number": 891000342234221123
					}
				]
			}
		]
	};

	return globalData;
});


