const LOGGER = (new (require("../logger/Logger"))("Character"));

class Character {
	constructor(json) {
		this.id = json.id;
		this.name = json.name;
		this.sex = json.sex;
		this.race = json.race;
		this.classid = json.classid;
		this.baseid = json.classid;
		this.x = json.x;
		this.y = json.y;
		this.z = json.z;
		this.level = json.level;
		this.hp = json.hp;
		this.HP = json.HP;
		this.mp = json.mp;
		this.MP = json.MP;
		this.sp = json.sp;
		this.exp = json.exp;
		this.karma = json.karma;
		this.pk = json.pk;
		this.pvp = json.pvp;
		this.face = json.face;
		this.hair_style = json.hair_style;
		this.hair_color = json.hair_style;
		this.vp = json.vp;
		this.deletetime = json.deletetime;
		this.last = json.last;
		this.nobless = json.nobless;
		this.access = json.access;
		this.clanid = null,
		this.isOnline = false;
	}

	setOnlineStatus(isOnline, updateInDb) {
		if (this.isOnline != isOnline) {
			this.isOnline = isOnline;
		}

		// Update the characters table of the database with online status and lastAccess (called when login and logout)
		if (updateInDb) {
			//updateOnlineStatus(); //Обновляем бд состояние статса и время
		}
	}

	getClassId() {
		return this.classid;
	}

	getClanId() {
		return this.clanid;
	}

	getRace() {
		return this.race;
	}

	getX() {
		return this.x;
	}

	getY() {
		return this.y;
	}

	getZ() {
		return this.z;
	}

	getSex() {
		return this.sex;
	}

	getName() {
		return this.name;
	}

	getCharId() {
		return this.id;
	}

	getTitle() {
		return this.name;
	}

	getReputation() {
		return this.karma;
	}

	getPkKills() {
		return this.pk;
	}

	getPvpKills() {
		return this.pvp;
	}

	getLevel() {
		return this.level;
	}

	getHP() {
		return this.HP;
	}

	getMP() {
		return this.MP;
	}

	getHp() {
		return this.hp;
	}

	getMp() {
		return this.mp;
	}

	getSp() {
		return this.sp;
	}

	getExp() {
		return this.exp;
	}
}
module.exports = Character;