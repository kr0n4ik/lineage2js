const Generator = require('../generator/generator');
const TableBaseStats = require('./TableBaseStats');
const ClassId = require('../enums/ClassId');
const LOGGER = (new (require("../logger/Logger"))("TableChar"));

class TableChar
{

	constructor()
	{
		this.characters = [];

		this.setRandomChar();
		this.setRandomChar();
		this.setRandomChar();
	}
	
	getCharById(id)
	{
		for (let col of this.characters)
		{
			if (col.id == id)
			{
				return col;
			}
		}
		return null;
	}
	
	getCharacters()
	{
		return this.characters;
	}
	
	
	setRandomChar()
	{
		function getRandomClass()
		{
			for (let i = 0; i < 100; i++)
			{
				let classid = Math.round(Math.random() * 200);
				for (let key in ClassId)
				{
					if (classid == ClassId[key].id && ClassId[key].race != null && ClassId[key].parent == null)
					{
						return ClassId[key];
					}
				}
			}
			return null;
		}


		let classid = getRandomClass();

		let stats = TableBaseStats.get(classid.id);

		let rndPosition = Math.round(Math.random() * (stats.staticData.creationPoints.length - 1));
		
		let HP = stats.lvlUpgainData[1].hp;
		let hp = Math.round(Math.random() * HP);
		
		let MP = stats.lvlUpgainData[1].mp;
		let mp = Math.round(Math.random() * MP);
		
		let sex = Math.round(Math.random());

		this.characters.push({
			'id': Generator.getNextId(),
			'name': "Tester-" + Math.round(Math.random() * 1000),
			'sex': sex,
			'race': classid.race,
			'classid': classid.id,
			'baseid': classid.id,
			'x': parseFloat(stats.staticData.creationPoints[rndPosition].x),
			'y': parseFloat(stats.staticData.creationPoints[rndPosition].y),
			'z': parseFloat(stats.staticData.creationPoints[rndPosition].z),
			'level': 1, 
			'hp': hp,
			'HP': HP,
			'mp': mp,
			'MP': MP,
			'sp': Math.round(Math.random() * 1000),
			'exp': 9,
			'karma': Math.round(Math.random() * 1000),
			'pk': Math.round(Math.random() * 1000),
			'pvp': Math.round(Math.random() * 1000),
			'face': Math.round(Math.random() * 2),
			'hair_style': Math.round(Math.random() * (sex == 0) ? 4 : 6), //дескриминация у мужского тоолько 4 причестки
			'hair_color': Math.round(Math.random() * 3),
			'vp': Math.round(Math.random() * 1000),
			'deletetime': 0,
			'last': Math.round(Math.random() * 1000),
			'nobless': Math.round(Math.random() * 1000),
			'access': Math.round(Math.random() * 1000)
		});
	}
}
module.exports = new TableChar;