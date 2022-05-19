const config = require("../config");
const TableBaseStats = require("../data/TableBaseStats");
const AttributeType = require("../enums/AttributeType");
const Inventory = require("./Inventory");

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
		this.CP = 777;
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
		this.title = "test";
		this.isDead = false;
		this.mountType = 0;
		this.privateStoreType = 0;
		this.crystallizeGrade = 0;
		this.fistsWeaponItem = 6;
		this.zones = [];
		this.stats = TableBaseStats.getStatsById(this.classid);
		this.inventory = new Inventory(json.inventory);
	}

	/*
	 * имя
	 */
	getName() {
		return this.name;
	}

	getVisibleName() {
		return this.getName();
	}

	getSex() {
		return this.sex;
	}

	getRace() {
		return this.race;
	}

	getClassId() {
		return this.classid;
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

	getSp() {
		return this.sp;
	}

	getExp() {
		return this.exp;
	}

	getLevel() {
		return this.level;
	}

	getCharId() {
		return this.id;
	}

	getId() {
		return this.id;
	}

	isChampion() {
		return false;
	}

	isMonster() {
		return false;
	}

	getLevel() {
		return this.level
	}

	isAggressive() {
		return true;
	}

	getTitle() {
		// Champion titles
		if (this.isChampion()) {
			return config.champ_title;
		}
		// Custom level titles
		if (config.show_npc_lvl && this.isMonster()) {
			let t = "Lv " + getLevel() + this.isAggressive() ? "*" : "";
			if (this.title != null) {
				t += " " + this.title;
			}
			return t;
		}
		// Set trap title
		//if (isTrap() && (((L2TrapInstance) this).getOwner() != null))
		//{
		//	_title = ((L2TrapInstance) this).getOwner().getName();
	//	}
		return this.title != null ? this.title : "";
	}

	isDead() {
		return this.isDead;
	}
	
	setIsDead(value) {
		this.isDead = value;
	}

	getSTR() {
		return 1;
	}

	getDEX() {
		return 2;
	}
	getCON() {
		return 3;
	}
	getINT() {
		return 4;
	}
	getWIT() {
		return 5;
	}
	getMEN() {
		return 6;
	}
	getLUC() {
		return 7;
	}
	getCHA() {
		return 8;
	}

	getHP() {
		return this.HP;
	}

	getMP() {
		return this.MP;
	}

	getCP() {
		return this.CP;
	}

	getHp() {
		return this.hp;
	}

	getMp() {
		return this.mp;
	}

	getCp() {
		return this.cp;
	}

	getVisualHair() {
		return this.hair_style;
	}

	getVisualHairColor() {
		return this.hair_color;
	}

	getVisualFace() {
		return this.face;
	}

	isHairAccessoryEnabled() {
		return false;
	}

	/**
	 * @return the type of Pet mounted (0 : none, 1 : Strider, 2 : Wyvern, 3: Wolf).
	 */
	getMountType() {
		return this.mountType;
	}

	/**
	 * <B><U> Values </U> :</B>
	 * <li>0 : STORE_PRIVATE_NONE</li>
	 * <li>1 : STORE_PRIVATE_SELL</li>
	 * <li>2 : sellmanage</li><BR>
	 * <li>3 : STORE_PRIVATE_BUY</li><BR>
	 * <li>4 : buymanage</li><BR>
	 * <li>5 : STORE_PRIVATE_MANUFACTURE</li><BR>
	 * @return the Private Store type of the L2PcInstance.
	 */
	getPrivateStoreType() {
		return this.privateStoreType;
	}

	getCrystallizeGrade() {
		return this.crystallizeGrade;
	}

	getAbilityPoints() {
		return Math.max(0, this.getLevel() - 84);
	}

	getAbilityPointsUsed() {
		return 0;//getVariables().getInt(isDualClassActive() ? PlayerVariables.ABILITY_POINTS_USED_DUAL_CLASS : PlayerVariables.ABILITY_POINTS_USED_MAIN_CLASS, 0);
	}

	getActiveWeaponInstance() {
		return null;//_inventory.getPaperdollItem(Inventory.PAPERDOLL_RHAND);
	}

	getActiveWeaponItem() {
		let weapon = this.getActiveWeaponInstance();
		if (weapon == null) {
			return this.fistsWeaponItem;
		}

		return weapon.getItem();
	}

	getPAtk() {
		return 345;
	}

	getPAtkSpd() {
		return 777;
	}

	getPDef() {
		return 555;
	}

	getEvasionRate() {
		return 7;
	}

	getAccuracy() {
		return 88;
	}

	getCriticalHit() {
		return 99;
	}

	getMAtk() {
		return 90;
	}

	getMAtkSpd() {
		return 55;
	}

	getMagicEvasionRate() {
		return 75;
	}

	getMDef() {
		return 222;
	}

	getMagicAccuracy() {
		return 54;
	}

	getMCriticalHit() {
		return 324;
	}

	isRaid() {
		return false;
	}

	getDefenseElementValue(defenseAttribute) {
		switch (defenseAttribute) {
			case AttributeType.FIRE: {
					return 543;
			}
			case AttributeType.WATER: {
					return 54;
			}
			case AttributeType.WIND: {
					return 876;
				}
			case AttributeType.EARTH: {
					return 456;
				}
			case AttributeType.HOLY: {
					return 4356;
				}
			case AttributeType.DARK: {
					return 456;
				}
			default: {
					return 456;
				}
		}
	}

	getMovementSpeedMultiplier() {
		return 1.0;
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

	getAttackSpeedMultiplier() {
		return 1.0;
	}

	getCollisionRadius() {
		let sex = this.getSex();
		return (sex == 1) ? this.stats.staticData.collisionFemale.radius : this.stats.staticData.collisionMale.radius;
	}

	getCollisionHeight() {
		let sex = this.getSex();
		return (sex == 1) ? this.stats.staticData.collisionFemale.height : this.stats.staticData.collisionMale.height;
	}

	getAttackElement() {
		return 0;
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

	getNameColor() {
		return 3453678;
	}

	getTitleColor() {
		return 3453;
	}

	getInventory() {
		return this.inventory;
	}

	getInventoryLimit() {
		return 555;
	}

	isInVehicle() {
		return false;
	}

	isRunning() {
		return false;
	}

	isFlying() {
		return false;
	}

	isFlyingMounted() {
		return false;
	}

	isInsideZone(zone) {
		this.zones[zone] > 0;
	}
}

module.exports = Character;
