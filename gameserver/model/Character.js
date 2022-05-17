const TableBaseStats = require("../data/TableBaseStats");
const TableChar = require("../data/TableChar");
const Inventory = require("./Inventory");

const LOGGER = (new (require("../logger/Logger"))("Character"));

class Character {
	constructor(json) {
		this.id = json.id;
		this.name = json.name;
		this.sex = json.sex;
		this.race = json.race;
		this.classid = json.classid;
		this.classbase = json.classbase;
		this.x = json.x;
		this.y = json.y;
		this.z = json.z;
		this.level = json.level;
		this.hp = json.hp;
		this.HP = json.HP;
		this.mp = json.mp;
		this.MP = json.MP;
		this.sp = json.sp;
		this.cp = json.cp;
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
		this.clanid = null;
		this.isOnline = false;
		this.isDead = false;
		this.stats = TableBaseStats.get(this.classid);
		this.inventory = new Inventory(json.inventory);
	}

	setOnlineStatus(isOnline, updateInDb) {
		if (this.isOnline != isOnline) {
			this.isOnline = isOnline;
		}

		if (updateInDb) {
			TableChar.setOnlineStatus(this.id);
		}
	}

	setIsDead(val) {
		this.isDead = val;
	}

	setIsDead(val) {
		this.isDead = val;
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

	getCp() {
		return this.cp;
	}

	getCP() {
		return 2000;
	}

	getExp() {
		return this.exp;
	}

	getClan() {
		return null;
	}

	isGM() {
		return false;
	}

	getVisibleName() {
		return this.name;
	}

	getSTR() {
		return this.stats.staticData.str;
	}

	getDEX() {
		return this.stats.staticData.dex;
	}

	getCON() {
		return this.stats.staticData.con;
	}

	getINT() {
		return this.stats.staticData.int;
	}

	getWIT() {
		return this.stats.staticData.wit;
	}

	getMEN() {
		return this.stats.staticData.men;
	}

	getLUC() {
		return 22;
	}

	getCHA() {
		return 22;
	}

	getMovementSpeedMultiplier() {
		return 1;
	}

	getWalkSpeed() {
		return this.stats.staticData.baseMoveSpd.walk;
	}

	getRunSpeed() {
		return this.stats.staticData.baseMoveSpd.run;
	}

	getSwimRunSpeed() {
		return this.stats.staticData.baseMoveSpd.fastSwim;
	}

	getSwimWalkSpeed() {
		return this.stats.staticData.baseMoveSpd.slowSwim;
	}

	isFlying() {
		return this.flying;
	}

	isRunning() {
		return true;
	}

	getVisualHair() {
		return 2;
	}

	getVisualHairColor() {
		return 0;
	}

	getVisualFace() {
		return 0;
	}

	isHairAccessoryEnabled() {
		return true;
	}

	getCollisionRadius() {
		let sex = this.getSex();
		return (sex == 1) ? this.stats.staticData.collisionFemale.radius : this.stats.staticData.collisionMale.radius;
	}

	getCollisionHeight() {
		let sex = this.getSex();
		return (sex == 1) ? this.stats.staticData.collisionFemale.height : this.stats.staticData.collisionMale.height;
	}

	getPAtk() {
		return this.stats.staticData.basePAtk;
	}

	getPAtkSpd() {
		return this.stats.staticData.basePAtkSpd;
	}

	getPDef() {
		let chest = this.stats.staticData.basePDef.chest || 0;
		let legs = this.stats.staticData.basePDef.legs || 0;
		let head = this.stats.staticData.basePDef.head || 0;
		let feet = this.stats.staticData.basePDef.feet || 0;
		let gloves = this.stats.staticData.basePDef.gloves || 0;
		let underwear = this.stats.staticData.basePDef.underwear || 0;
		let cloak = this.stats.staticData.basePDef.cloak || 0;
		let hair = this.stats.staticData.basePDef.hair || 0;
		return chest + legs + head + feet + gloves + underwear + cloak + hair;
	}

	getEvasionRate() {
		//Добавить оружие и провекрук
		let level = this.getLevel();
		let value = 0;
		if (this.isPlayer) {
			value += (Math.sqrt(this.getDEX()) * 5) + level;
			if (level > 69) {
				value += level - 69;
			}
			if (level > 77) {
				value += 1;
			}
			if (level > 80) {
				value += 2;
			}
			if (level > 87) {
				value += 2;
			}
			if (level > 92) {
				value += 1;
			}
			if (level > 97) {
				value += 1;
			}
		}
		else {
			value += (Math.sqrt(this.getDEX()) * 5) + level;
			if (level > 69) {
				value += (level - 69) + 2;
			}
		}

		return value;
	}

	getAccuracy() {
		let value = 0;
		let level = this.getLevel();
		value += (Math.sqrt(this.getDEX()) * 5) + level;
		if (level > 69) {
			value += level - 69;
		}
		if (level > 77) {
			value += 1;
		}
		if (level > 80) {
			value += 2;
		}
		if (level > 87) {
			value += 2;
		}
		if (level > 92) {
			value += 1;
		}
		if (level > 97) {
			value += 1;
		}

		if (this.isPlayer) {
			// Enchanted gloves bonus
			//baseValue += calcEnchantBodyPart(creature, L2Item.SLOT_GLOVES);
		}

		return value;
	}

	getCriticalHit() {
		return 55;
	}

	getMAtk() {
		return this.stats.staticData.baseMAtk;
	}

	getMAtkSpd() {
		return this.stats.staticData.baseMAtkSpd;
	}

	getMagicEvasionRate() {
		//добавть оружие и проверк плеер это или персонаж
		let level = this.getLevel();
		let value = 0;
		value += (Math.sqrt(this.getWIT()) * 3) + (level * 2);
		return value;
	}

	getMDef() {
		let rear = this.stats.staticData.baseMDef.rear || 0;
		let lear = this.stats.staticData.baseMDef.lear || 0;
		let rfinger = this.stats.staticData.baseMDef.rfinger || 0;
		let lfinger = this.stats.staticData.baseMDef.lfinger || 0;
		let neck = this.stats.staticData.baseMDef.neck || 0;
		return rear + lear + rfinger + lfinger + neck;
	}

	getMagicAccuracy() {
		let value = 0;
		if (this.isPlayer) {
			// Enchanted gloves bonus
			//baseValue += calcEnchantBodyPart(creature, L2Item.SLOT_GLOVES);
		}

		value += (Math.sqrt(this.getWIT()) * 3) + (this.getLevel() * 2)

		return value;
	}

	getMCriticalHit() {
		return 33;
	}

	getAdena() {
		return 34545;
	}

	getCurrentLoad() {
		let weight = 0;
		//for (let item of this.inventory.items) {
		//	weight += item.item.weight || 0;
		//}
		return weight;
	}

	getMaxLoad() {
		return 100 * 6900;//Math.floor(BaseStats.CON.calcBonus(this) * 69000 * Config.ALT_WEIGHT_LIMIT);;
	}

	isInventoryDisabled() {
		return false;
	}

	getActiveWeaponItem() {
		return null;
	}

	getAttackSpeedMultiplier() {
		return 10;
	}

	getPledgeType() {
		return 0;
	}

	getClanCrestLargeId() {
		return 0;
	}

	getClanCrestId() {
		return 0;
	}

	isClanLeader() {
		return true;
	}

	getAllyId() {
		return 0;
	}

	getAllyCrestId() {
		return 0;
	}

	isInMatchingRoom() {
		return false;
	}

	getPvpFlag() {
		return 0;
	}

	isHero() {
		return true;
	}

	getPledgeClass() {
		return 0;
	}

	getRecomLeft() {
		return 0;
	}

	getRecomHave() {
		return 0;
	}

	getNameColor() {
		return 3453;
	}

	getTitleColor() {
		return 3453;
	}

	getInventoryLimit() {
		return 500;
	}

	isTrueHero() {
		return true;
	}

	getInventory() {
		return this.inventory;
	}

	getClanPrivileges() {
		return 0xFF;
	}

	getVitalityPoints() {
		return this.vp;
	}

	getFame() {
		return 0;
	}

	getRaidbossPoints() {
		return 100;
	}
}
module.exports = Character;