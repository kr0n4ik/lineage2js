const Item = require("./Item");
const Paperdoll = require("../enums/Paperdoll");
class Inventory
{
	constructor(json) 
	{
		console.log(json);
		this.items = [];
		for (let col of json) {
			this.addItem(col.id, col.id, col.equipped, 5);
		}
	}

	addItem(gid, id, equ, loc) {
		this.items.push(new Item(gid, id, equ, loc));
	}

	getWeaponEnchant() {
		let item = this.getPaperdollItem(Paperdoll.PAPERDOLL_RHAND);
		return item != null ? item.getEnchantLevel() : 0;
	}

	getPaperdollItem(id) {
		return null;
	}

	getTalismanSlots() {
		return 0;
	}

	getBroochJewelSlots() {
		return 5;
	}
}
module.exports = Inventory;