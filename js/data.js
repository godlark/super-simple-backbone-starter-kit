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
						"value": 2500.0,
						"to_name": "Joanna Struga-Okoń",
						"to_address": "Warszawa 00-000, ul. Tysiąclecia 2",
						"to_number": 891000342234221123,
						"date": '2015-12-12'
					},
					{
						"title": "Początkowa wpłata",
						"value": 2500.0,
						"to_name": "Joanna Struga-Okoń",
						"to_address": "Warszawa 00-000, ul. Tysiąclecia 2",
						"to_number": 723420343453421123,
						"date": '2015-12-12'
					}
				],
				"transactions_from": [
					{
						"title": "Początkowa wpłata",
						"value": 10000.0,
						"from_name": "Jan Kowalski",
						"from_address": "Warszawa 00-000, ul. Tysiąclecia 1",
						"from_number": 232348091343298430,
						"date": '2015-11-12'
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
						"value": 2500.0,
						"from_name": "Joanna Struga-Okoń",
						"from_address": "Warszawa 00-000, ul. Tysiąclecia 2",
						"from_number": 891000342234221123,
						"date": '2015-12-12'
					}
				]
			},
			{
				"name": "Rachunek oszczędnościowy 'Dziecko'",
				"number": 723420343453421123,
				"id": 3,
				"transactions_to": [],
				"transactions_from": [
					{
						"title": "Początkowa wpłata",
						"value": 2500.0,
						"from_name": "Joanna Struga-Okoń",
						"from_address": "Warszawa 00-000, ul. Tysiąclecia 2",
						"from_number": 891000342234221123,
						"date": '2015-12-12'
					}
				]
			}
		]
	};

	return globalData;
});


