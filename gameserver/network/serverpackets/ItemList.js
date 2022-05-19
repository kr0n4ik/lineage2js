class ItemList
{
	constructor(activeChar, showWindow) 
	{
		this.activeChar = activeChar;
		this.showWindow = showWindow;
		this.mask = 0x00;
	}

	write(packet)
	{
		let items = this.activeChar.getInventory().getItems();
		packet.writeC(0x11);
		packet.writeH(this.showWindow ? 1 : 0);
		packet.writeH(items.length);
		for (let item of items) {
			packet.writeC(this.mask);
			packet.writeD(item.getId()); // ObjectId
			packet.writeD(item.getItemId()); // ItemId
			packet.writeC(item.isQuestItem() || (item.isEquipped()) ? 0xFF : item.getLocation()); // T1
			packet.writeQ(item.getCount()); // Quantity
			packet.writeC(item.getType2()); // Item Type 2 : 00-weapon, 01-shield/armor, 02-ring/earring/necklace, 03-questitem, 04-adena, 05-item
			packet.writeC(item.getCustomType1()); // Filler (always 0)
			packet.writeH(item.isEquipped()); // Equipped : 00-No, 01-yes
			packet.writeQ(item.getBodyPart()); // Slot : 0006-lr.ear, 0008-neck, 0030-lr.finger, 0040-head, 0100-l.hand, 0200-gloves, 0400-chest, 0800-pants, 1000-feet, 4000-r.hand, 8000-r.hand
			packet.writeC(item.getEnchantLevel()); // Enchant level (pet level shown in control item)
			packet.writeC(0x01); // TODO : Find me
			packet.writeD(item.getMana());
			packet.writeD(item.getTime());
			packet.writeC(item.isAvailable() ? 1 : 0); // GOD Item enabled = 1 disabled (red) = 0
		}
	}
}
module.exports = ItemList;