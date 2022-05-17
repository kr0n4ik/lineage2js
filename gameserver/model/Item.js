const TableItems = require("../data/TableItems");

const LOGGER = (new (require("../logger/Logger"))("Item"));

class Item
{
	
	constructor(gid, id, equ, loc)
	{
		this.items = TableItems.getItemById(id);
		if (this.items == null) {
			LOGGER.error("Items " + id + " not found");
		}
		this.gid = gid;
		this.id = id;
		this.equipped = equ;
		this.loc = loc;
		this.enchant_level = 0;
	}

	getEnchantLevel() {
		return this.enchant_level;
	}
}
module.exports = Item;