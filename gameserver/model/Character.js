const config = require("../config");
const TableBaseStats = require("../data/TableBaseStats");
const TableChar = require("../data/TableChar");
const AttributeType = require("../enums/AttributeType");
const Inventory = require("./itemcontainer/Inventory");

class Character {
	constructor(json) {
		this.stats = TableBaseStats.getStatsById(json.classid);
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
		this.isOnline = false;

		//inventory
		this.inventory = new Inventory(json.inventory);

		//clan
		this.clan_id = null;
		this.clan = null;

		this.is_champion = false;
		this.is_aggressive = true;
		this.is_dead = false;
		this.is_hero = false;
		this.is_flying = false;
		this.is_running = false;
		this.is_true_hero = false;

		//basic_info
		this.visibleName = null;
		this.is_gm = false;

		//APPAREANCE

		//STATUS
		this.mount_type = 0;
		this.private_store_type = 0;
	}

	isRunning() {
		return this.is_running;
	}

	isFlying() {
		return this.is_flying;
	}

	getInventory() {
		return this.inventory;
	}

	//TRUE_HERO
	isTrueHero() {
		return this.is_true_hero;
	}

	//INVENTORY_LIMIT
	getInventoryLimit() {
		return 5;
	}

	//COLOR
	getNameColor() {
		return 0x00FF00;
	}
	getTitleColor() {
		return 0xFF0000;
	}

	//SLOTS
	getTeam() {
		return 0;
	}

	//VITA_FAME
	getVitalityPoints() {
		return this.vp;
	}
	getFame() {
		return 0;
	}
	getRaidbossPoints() {
		return 100;
	}

	//SOCIAL
	getPvpFlag() {
		return 0;
	}
	getReputation() {
		return this.karma;
	}
	getNobleLevel() {
		return 0;
	}
	isHero() {
		return this.is_hero;
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
	getPkKills() {
		return this.pk;
	}
	getPvpKills() {
		return this.pvp;
	}

	//CLAN
	getClanId() {
		return this.clan_id;
	}
	getClan() {
		return this.clan;
	}
	getPledgeType() {
		return 0;
	}
	getClanPrivileges() {
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

	//ATK_ELEMENTAL
	getAttackElement() {
		return 0;
	}

	//COL_RADIUS_HEIGHT
	getCollisionRadius() {
		return (this.getSex() == 1) ? this.stats.staticData.collisionFemale.radius : this.stats.staticData.collisionMale.radius;
	}
	getCollisionHeight() {
		return (this.getSex() == 1) ? this.stats.staticData.collisionFemale.height : this.stats.staticData.collisionMale.height;
	}

	//MULTIPLER
	getAttackSpeedMultiplier() {
		return 1.0;
	}

	//SPEED
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

	//POSITION
	isInVehicle() {
		return false;
	}

	//ELEMENTS
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

	//STATS
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

	//STATUS
	/**
	 * @return the type of Pet mounted (0 : none, 1 : Strider, 2 : Wyvern, 3: Wolf).
	 */
	getMountType() {
		return this.mount_type;
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
		return this.private_store_type;
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

	//APPAREANCE
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
		return true;
	}

	//MAX_HPCPMP
	getHP() {
		return this.HP;
	}
	getMP() {
		return this.MP;
	}
	getCP() {
		return this.CP;
	}

	//BASE_STATS
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

	//basic_info
	setVisibleName(visibleName) {
		this.visibleName = visibleName;
	}

	getVisibleName() {
		if (this.visibleName == null) {
			return this.getName();
		}
		return this.visibleName;
	}

	isGM() {
		return this.is_gm;
	}

	getId() {
		return this.id;
	}

	getName() {
		return this.name;
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

	getHp() {
		return this.hp;
	}

	getMp() {
		return this.mp;
	}

	getCp() {
		return this.cp;
	}

	setOnlineStatus(isOnline, updateInDb) {
		if (this.isOnline != isOnline) {
			this.isOnline = isOnline;
		}

		if (updateInDb) {
			TableChar.setOnlineStatus(this.id);
		}
	}

	//is is

	setIsDead() {
		this.is_dead = true;
	}

	isChampion() {
		return this.is_champion;
	}

	isAggressive() {
		return this.is_aggressive;
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

	isInsideZone(zone) {
		this.zones[zone] > 0;
	}

	isFlyingMounted() {
		return false;
	}
}

module.exports = Character;
