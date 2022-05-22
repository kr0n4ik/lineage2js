const TableItems = require("../data/TableItems");
const LOGGER = (new (require("../logger/Logger"))("Item"));

class Item
{
	static TYPE1_WEAPON_RING_EARRING_NECKLACE = 0;
	static TYPE1_SHIELD_ARMOR = 1;
	static TYPE1_ITEM_QUESTITEM_ADENA = 4;

	static TYPE2_WEAPON = 0;
	static TYPE2_SHIELD_ARMOR = 1;
	static TYPE2_ACCESSORY = 2;
	static TYPE2_QUEST = 3;
	static TYPE2_MONEY = 4;
	static TYPE2_OTHER = 5;

	static SLOT_NONE = 0x0000;
	static SLOT_UNDERWEAR = 0x0001;
	static SLOT_R_EAR = 0x0002;
	static SLOT_L_EAR = 0x0004;
	static SLOT_LR_EAR = 0x00006;
	static SLOT_NECK = 0x0008;
	static SLOT_R_FINGER = 0x0010;
	static SLOT_L_FINGER = 0x0020;
	static SLOT_LR_FINGER = 0x0030;
	static SLOT_HEAD = 0x0040;
	static SLOT_R_HAND = 0x0080;
	static SLOT_L_HAND = 0x0100;
	static SLOT_GLOVES = 0x0200;
	static SLOT_CHEST = 0x0400;
	static SLOT_LEGS = 0x0800;
	static SLOT_FEET = 0x1000;
	static SLOT_BACK = 0x2000;
	static SLOT_LR_HAND = 0x4000;
	static SLOT_FULL_ARMOR = 0x8000;
	static SLOT_HAIR = 0x010000;
	static SLOT_ALLDRESS = 0x020000;
	static SLOT_HAIR2 = 0x040000;
	static SLOT_HAIRALL = 0x080000;
	static SLOT_R_BRACELET = 0x100000;
	static SLOT_L_BRACELET = 0x200000;
	static SLOT_DECO = 0x400000;
	static SLOT_BELT = 0x10000000;
	static SLOT_BROOCH = 0x20000000;
	static SLOT_BROOCH_JEWEL = 0x40000000;

	static SLOT_WOLF = -100;
	static SLOT_HATCHLING = -101;
	static SLOT_STRIDER = -102;
	static SLOT_BABYPET = -103;
	static SLOT_GREATWOLF = -104;

	constructor(uid, id, equ, slot)
	{
		this.item = TableItems.getItemById(id);
		this.uid = uid;
		this.id = id;
		this.equ = equ;
		this.slot = slot;
	}

	getItem() {
		return this.item;
	}

	isEquipped() {
		return this.equ;
	}

	getBodyPart() {
		let bodypart = his.item.bodypart.toLowerCase();
		if (bodypart == "shirt" || bodypart == "underwear") {
			return Item.SLOT_UNDERWEAR;
		} else if (bodypart == "rear;lear") {
			return Item.SLOT_R_EAR | Item.SLOT_L_EAR;
		} else if (bodypart == "neck") {
			return Item.SLOT_NECK;
		} else if (bodypart == "rfinger;lfinger") {
			return Item.SLOT_R_FINGER | Item.SLOT_L_FINGER;
		} else if (bodypart == "head") {
			return Item.SLOT_HEAD;
		} else if (bodypart == "rhand") {
			return Item.SLOT_R_HAND;
		} else if (bodypart == "lhand") {
			return Item.SLOT_L_HAND;
		} else if (bodypart == "lrhand") {
			return Item.SLOT_LR_HAND;
		} else if (bodypart == "gloves") {
			return Item.SLOT_GLOVES;
		} else if (bodypart == "legs") {
			return Item.SLOT_LEGS;
		} else if (bodypart == "chest") {
			return Item.SLOT_CHEST;
		} else if (bodypart == "chest,legs") {
			return Item.SLOT_CHEST | Item.SLOT_LEGS;
		} else if (bodypart == "feet") {
			return Item.SLOT_FEET;
		} else if (bodypart == "back") {
			return Item.SLOT_BACK;
		} else if (bodypart == "onepiece") {
			return Item.SLOT_FULL_ARMOR;
		} else if (bodypart == "hair") {
			return Item.SLOT_HAIR;
		} else if (bodypart == "alldress") {
			return Item.SLOT_ALLDRESS;
		} else if (bodypart == "hair2") {
			return Item.SLOT_HAIR2;
		} else if (bodypart == "dhair") {
			return Item.SLOT_HAIRALL;
		} else if (bodypart == "rbracelet") {
			return Item.SLOT_R_BRACELET;
		} else if (bodypart == "lbracelet") {
			return Item.SLOT_L_BRACELET;
		} else if (bodypart == "decol") {
			return Item.SLOT_DECO;
		} else if (bodypart == "waist") {
			return Item.SLOT_BELT;
		} else if (bodypart == "brooch") {
			return Item.SLOT_BROOCH;
		} else if (bodypart == "brooch_jewel") {
			return Item.SLOT_BROOCH_JEWEL;
		} else if (bodypart == "wolf") {
			return Item.SLOT_WOLF;
		} else if (bodypart == "hatchling") {
			return Item.SLOT_HATCHLING;
		} else if (bodypart == "strider") {
			return Item.SLOT_STRIDER;
		} else if (bodypart == "babypet") {
			return Item.SLOT_BABYPET;
		} else if (bodypart == "greatwolf") {
			return Item.SLOT_GREATWOLF;
		} else {
			return Item.SLOT_NONE;
		}
	}

	getSlot() {
		return this.slot;
	}

	isSlot(slot) {
		//if ()
	}

}
module.exports = Item;