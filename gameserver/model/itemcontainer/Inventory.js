const Item = require("../Item");
const TableItems = require("../../data/TableItems");

class Inventory {
	static ADENA_ID = 57;
	static ANCIENT_ADENA_ID = 5575;
	static BEAUTY_TICKET_ID = 36308;
	static AIR_STONE_ID = 39461;
	static TEMPEST_STONE_ID = 39592;
	static ELCYUM_CRYSTAL_ID = 36514;

	static MAX_ADENA = 100000;

	static PAPERDOLL_UNDER = 0;
	static PAPERDOLL_HEAD = 1;
	static PAPERDOLL_HAIR = 2;
	static PAPERDOLL_HAIR2 = 3;
	static PAPERDOLL_NECK = 4;
	static PAPERDOLL_RHAND = 5;
	static PAPERDOLL_CHEST = 6;
	static PAPERDOLL_LHAND = 7;
	static PAPERDOLL_REAR = 8;
	static PAPERDOLL_LEAR = 9;
	static PAPERDOLL_GLOVES = 10;
	static PAPERDOLL_LEGS = 11;
	static PAPERDOLL_FEET = 12;
	static PAPERDOLL_RFINGER = 13;
	static PAPERDOLL_LFINGER = 14;
	static PAPERDOLL_LBRACELET = 15;
	static PAPERDOLL_RBRACELET = 16;
	static PAPERDOLL_DECO1 = 17;
	static PAPERDOLL_DECO2 = 18;
	static PAPERDOLL_DECO3 = 19;
	static PAPERDOLL_DECO4 = 20;
	static PAPERDOLL_DECO5 = 21;
	static PAPERDOLL_DECO6 = 22;
	static PAPERDOLL_CLOAK = 23;
	static PAPERDOLL_BELT = 24;
	static PAPERDOLL_BROOCH = 25;
	static PAPERDOLL_BROOCH_JEWEL1 = 26;
	static PAPERDOLL_BROOCH_JEWEL2 = 27;
	static PAPERDOLL_BROOCH_JEWEL3 = 28;
	static PAPERDOLL_BROOCH_JEWEL4 = 29;
	static PAPERDOLL_BROOCH_JEWEL5 = 30;
	static PAPERDOLL_BROOCH_JEWEL6 = 31;
	static PAPERDOLL_TOTALSLOTS = 32;

	static MAX_ARMOR_WEIGHT = 12000;

	constructor(json) {
		this.items = [];
	}

	getTalismanSlots() {
		return 0;
	}

	getBroochJewelSlots() {
		return 5;
	}

	getPaperdollItem(slot) {
		for (let item of this.items) {
			if (item.getSlot() == slot && item.isEquipped()) {
				return item;
			}
		}
		return null;
	}

}
module.exports = Inventory;