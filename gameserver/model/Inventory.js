const Item = require("./Item");

class Inventory {
	constructor(json) {
		this.items = [];
		for (let col of json) {
			let item = new Item(col.id, col.id, col.equipped, 5);
			this.addItem(item);
		}
	}

	getItems() {
		return this.items;
	}

	addItem(item) {
		this.items.push(item);
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