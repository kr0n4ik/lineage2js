const config = require("../config");
const TableBaseStats = require("../data/TableBaseStats");

class Stats {
	constructor(caharacter) {
		this.caharacter = caharacter;
		this.stats = TableBaseStats.get(caharacter.classid);
	}

	getPAtk() {
		/*let baseValue = 0;

		if (this.caharacter.isPlayer()) {
			// Enchanted chest bonus
			//baseValue += calcEnchantBodyPart(creature, L2Item.SLOT_CHEST, L2Item.SLOT_FULL_ARMOR);
		}

		if (config.champion_enable && creature.isChampion()) {
			baseValue *= config.champion_atk;
		}
		if (creature.isRaid()) {
			baseValue *= Config.RAID_PATTACK_MULTIPLIER;
		}
		let chaBonus = this.caharacter.isPlayer() ? this.BaseStats('cha') : 1.;
		let strBonus = this.caharacter.getSTR() > 0 ? BaseStats.STR.calcBonus(creature) : 1.;
		baseValue *= strBonus * creature.getLevelMod() * chaBonus;
		return Math.min(Stats.defaultValue(creature, stat, baseValue), Config.MAX_PATK);
		*/
		return 440;
	}

	getPAtkSpd() {
		return 333;
	}

	getPDef() {
		return 444;
	}

	BaseStats(val) {
		return this.stats.staticData[val] || 0;
	}
}
module.exports = Stats;