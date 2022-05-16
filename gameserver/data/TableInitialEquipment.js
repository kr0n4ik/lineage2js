let data = [
	{
		"classid": 0,
		"equipment": [
			{
				"id": 2369,
				"count": 1,
				"equipped": true
			},
			{
				"id": 1146,
				"count": 1,
				"equipped": true
			},
			{
				"id": 1147,
				"count": 1,
				"equipped": true
			},
			{
				"id": 33801,
				"count": 1,
				"equipped": false
			},
			{
				"id": 10,
				"count": 1,
				"equipped": false
			}
		]
	},
	{
		"classid": 10,
		"equipment": [
			{
				"id": 6,
				"count": 1,
				"equipped": true
			},
			{
				"id": 425,
				"count": 1,
				"equipped": true
			},
			{
				"id": 461,
				"count": 1,
				"equipped": true
			},
			{
				"id": 33801,
				"count": 1,
				"equipped": false
			}
		]
	},
	{
		"classid": 18,
		"equipment": [
			{
				"id": 2369,
				"count": 1,
				"equipped": true
			},
			{
				"id": 1146,
				"count": 1,
				"equipped": true
			},
			{
				"id": 1147,
				"count": 1,
				"equipped": true
			},
			{
				"id": 33801,
				"count": 1,
				"equipped": false
			},
			{
				"id": 10,
				"count": 1,
				"equipped": false
			}
		]
	},
	{
		"classid": 25,
		"equipment": [
			{
				"id": 6,
				"count": 1,
				"equipped": true
			},
			{
				"id": 425,
				"count": 1,
				"equipped": true
			},
			{
				"id": 461,
				"count": 1,
				"equipped": true
			},
			{
				"id": 33801,
				"count": 1,
				"equipped": false
			}
		]
	},
	{
		"classid": 31,
		"equipment": [
			{
				"id": 2369,
				"count": 1,
				"equipped": true
			},
			{
				"id": 1146,
				"count": 1,
				"equipped": true
			},
			{
				"id": 1147,
				"count": 1,
				"equipped": true
			},
			{
				"id": 33801,
				"count": 1,
				"equipped": false
			},
			{
				"id": 10,
				"count": 1,
				"equipped": false
			}
		]
	},
	{
		"classid": 38,
		"equipment": [
			{
				"id": 6,
				"count": 1,
				"equipped": true
			},
			{
				"id": 425,
				"count": 1,
				"equipped": true
			},
			{
				"id": 461,
				"count": 1,
				"equipped": true
			},
			{
				"id": 33801,
				"count": 1,
				"equipped": false
			}
		]
	},
	{
		"classid": 44,
		"equipment": [
			{
				"id": 2369,
				"count": 1,
				"equipped": true
			},
			{
				"id": 1146,
				"count": 1,
				"equipped": true
			},
			{
				"id": 1147,
				"count": 1,
				"equipped": true
			},
			{
				"id": 33801,
				"count": 1,
				"equipped": false
			},
			{
				"id": 2368,
				"count": 1,
				"equipped": false
			}
		]
	},
	{
		"classid": 49,
		"equipment": [
			{
				"id": 2368,
				"count": 1,
				"equipped": true
			},
			{
				"id": 425,
				"count": 1,
				"equipped": true
			},
			{
				"id": 461,
				"count": 1,
				"equipped": true
			},
			{
				"id": 33801,
				"count": 1,
				"equipped": false
			}
		]
	},
	{
		"classid": 53,
		"equipment": [
			{
				"id": 2370,
				"count": 1,
				"equipped": true
			},
			{
				"id": 10,
				"count": 1,
				"equipped": false
			},
			{
				"id": 1146,
				"count": 1,
				"equipped": true
			},
			{
				"id": 1147,
				"count": 1,
				"equipped": true
			},
			{
				"id": 33801,
				"count": 1,
				"equipped": false
			}
		]
	},
	{
		"classid": 123,
		"equipment": [
			{
				"id": 2369,
				"count": 1,
				"equipped": true
			},
			{
				"id": 1146,
				"count": 1,
				"equipped": true
			},
			{
				"id": 1147,
				"count": 1,
				"equipped": true
			},
			{
				"id": 33801,
				"count": 1,
				"equipped": false
			},
			{
				"id": 10,
				"count": 1,
				"equipped": false
			}
		]
	},
	{
		"classid": 124,
		"equipment": [
			{
				"id": 2369,
				"count": 1,
				"equipped": true
			},
			{
				"id": 1146,
				"count": 1,
				"equipped": true
			},
			{
				"id": 1147,
				"count": 1,
				"equipped": true
			},
			{
				"id": 33801,
				"count": 1,
				"equipped": false
			},
			{
				"id": 10,
				"count": 1,
				"equipped": false
			}
		]
	},
	{
		"classid": 182,
		"equipment": [
			{
				"id": 2368,
				"count": 1,
				"equipped": true
			},
			{
				"id": 1146,
				"count": 1,
				"equipped": true
			},
			{
				"id": 1147,
				"count": 1,
				"equipped": true
			},
			{
				"id": 33801,
				"count": 1,
				"equipped": false
			}
		]
	},
	{
		"classid": 183,
		"equipment": [
			{
				"id": 40061,
				"count": 1,
				"equipped": true
			},
			{
				"id": 425,
				"count": 1,
				"equipped": true
			},
			{
				"id": 461,
				"count": 1,
				"equipped": true
			},
			{
				"id": 33801,
				"count": 1,
				"equipped": false
			}
		]
	}
];
class TableInitialEquipment {
	constructor() {
	}

	get(id) {
		for (let col of data) {
			if (col.classid == id) {
				return col.equipment;
			}
		}
		return null;
	}
}
module.exports = new TableInitialEquipment();