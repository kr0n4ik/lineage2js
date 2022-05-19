const Paperdoll = require("../../enums/Paperdoll");

class ExUserInfoEquipSlot
{
	constructor(cha, all) 
	{
		this.slot = [
			Paperdoll.UNDER,
			Paperdoll.REAR,
			Paperdoll.LEAR,
			Paperdoll.NECK,
			Paperdoll.RFINGER,
			Paperdoll.LFINGER,
			Paperdoll.HEAD,
			Paperdoll.RHAND,
			Paperdoll.LHAND,
			Paperdoll.GLOVES,
			Paperdoll.CHEST,
			Paperdoll.LEGS,
			Paperdoll.FEET,
			Paperdoll.CLOAK,
			Paperdoll.RHAND,
			Paperdoll.HAIR,
			Paperdoll.HAIR2,
			Paperdoll.RBRACELET,
			Paperdoll.LBRACELET,
			Paperdoll.DECO1,
			Paperdoll.DECO2,
			Paperdoll.DECO3,
			Paperdoll.DECO4,
			Paperdoll.DECO5,
			Paperdoll.DECO6,
			Paperdoll.BELT,
			Paperdoll.BROOCH,
			Paperdoll.BROOCH_JEWEL1,
			Paperdoll.BROOCH_JEWEL2,
			Paperdoll.BROOCH_JEWEL3,
			Paperdoll.BROOCH_JEWEL4,
			Paperdoll.BROOCH_JEWEL5,
			Paperdoll.BROOCH_JEWEL6
		];

		this.code = [0x80, 0x40, 0x20, 0x10, 0x08, 0x04, 0x02, 0x01];
		this.masks = [0x00, 0x00, 0x00, 0x00, 0x00];
		this.cha = cha;

		if (all) {
			for (let slot of this.slot) {
				this.add(slot);
			}
		}
	}

	add(mask) {
		this.masks[mask >> 3] |= this.code[mask & 7];
	}

	
	write(packet) 
	{
		packet.writeC(0xFE);
		packet.writeH(0x156);
		packet.writeD(this.cha.getId());
		packet.writeH(this.slot.length);
		packet.writeB(this.masks);
		let inventory = this.cha.getInventory();
		for (let slot of this.slot)
		{
			if (this.contains(slot))
			{
				let item = inventory.getPaperdollItem(slot);
				packet.writeH(22); // 10 + 4 * 3
				packet.writeD((item) ? item.getId() : 0x00);
				packet.writeD((item) ? item.getItemId() : 0x00);
				packet.writeD(0);
				packet.writeD(0);
				packet.writeD(0x00);
			}
		}
	}

	contains(mask) {
		return (this.masks[mask >> 3] & this.code[mask & 7]) != 0;
	}
}
module.exports =  ExUserInfoEquipSlot;