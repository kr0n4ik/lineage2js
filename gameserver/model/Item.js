const TableItems = require("../data/TableItems");
const Paperdoll = require("../enums/Paperdoll");
const LOGGER = (new (require("../logger/Logger"))("Item"));

class Item
{
	constructor(gid, id, equ, loc)
	{
		this.item = TableItems.getItemById(id);
		if (this.item == null) {
			LOGGER.error("Items " + id + " not found");
		}
		this.gid = gid;
		this.id = id;
		this.equipped = equ;
		this.loc = loc;
		this.enchant_level = 0;
	}
    
    isEquipped(){
        return this.equipped;
    }

	getId() {
		return this.gid;
	}

	getItemId() {
		return this.id;
	}

	getEnchantLevel() {
		return this.enchant_level;
	}

	getSlot() {
		if (!this.item)
			return 0;
		switch (this.item.bodypart) {
			case "underwear":
				return Paperdoll.UNDER;
			case "head":
				return Paperdoll.HEAD;
			case "rhand":
				return Paperdoll.RHAND;
			case "hair":
				return Paperdoll.HAIR;
			case "hair2":
				return Paperdoll.HAIR2;
			case "neck":
				return Paperdoll.NECK;
			case "chest":
				return Paperdoll.CHEST;
			case "legs":
				return Paperdoll.LEGS;
		}
	}

	isQuestItem() {
		return false;
	}

	getLocation() {
		return 0;
	}

	getEquipped() {
		return 1;
	}

	getCount() {
		return 5;
	}

	getType2() {
		return 1;
	}

	getCustomType1() {
		return 1;
	}


	getBodyPart() {
		if (!this.item)
			return 0;
		let bodypart = this.item.bodypart;
		switch (bodypart) {
			case 'brooch':
				return 0x20000000;
			case 'fullarmor':
				return 0x8000;
			case 'rhand':
				return 0x80;
			case 'lhand':
				return 0x100;
			case 'chest':
				return 0x400;
			case 'legs':
				return 0x800;
		}
		return 0;
	}

	getMana() {
		return -1;
	}

	getTime() {
		return -1;
	}

	isAvailable() {
		return true;
	}
}
module.exports = Item;