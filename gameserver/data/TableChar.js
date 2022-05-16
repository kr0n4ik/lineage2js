const Generator = require('../generator/generator');
const TableBaseStats = require('./TableBaseStats');
const TableInitialEquipment = require('./TableInitialEquipment');
const TableClassId = require('./TableClassId');
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
	
	getCharacters(id)
	{
		return this.characters;
	}

	setOnlineStatus(id) {
		let col = this.getCharacters(id);
		if (col != null) {
			col.last = Date.now();
			col.online = true;
		}
	}
	
	
	setRandomChar()
	{

		let classid = TableClassId.getRandomClass();

		let stats = TableBaseStats.get(classid.id);

		let inventory = TableInitialEquipment.get(classid.id);

		let rndPosition = Math.round(Math.random() * (stats.staticData.creationPoints.length - 1));
		
		let HP = stats.lvlUpgainData[1].hp;
		let hp = Math.round(Math.random() * HP);
		
		let MP = stats.lvlUpgainData[1].mp;
		let mp = Math.round(Math.random() * MP);
		
		let sex = Math.round(Math.random());

		this.characters.push({
			'online' : false,
			'id': Generator.getNextId(),
			'name': "Tester-" + Math.round(Math.random() * 1000),
			'sex': sex,
			'race': classid.race,
			'classid': classid.id,
			'baseid': TableClassId.getRootClassId(classid.id),
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
			'cp': Math.round(Math.random() * 1000),
			'deletetime': 0,
			'last': Date.now(),
			'nobless': Math.round(Math.random() * 1000),
			'access': Math.round(Math.random() * 1000),
			'inventory': inventory
		});
	}
}
module.exports = new TableChar;