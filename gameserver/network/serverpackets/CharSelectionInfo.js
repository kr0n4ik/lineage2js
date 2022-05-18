const config = require("../../config");
const TableChar = require("../../data/TableChar");
const TableExperience = require("../../data/TableExperience");
const TableItems = require("../../data/TableItems");
const LOGGER = (new (require("../../logger/Logger"))("CharSelectionInfo"));

class CharSelectionInfo 
{
	constructor(loginName, sessionId, activeId = -1) 
	{
		this.loginName = loginName;
		this.sessionId = sessionId;
		this.activeId = activeId;
	}

	write(packet) 
	{
		let characters = TableChar.getCharacters(this.loginName);
		packet.writeC(0x09);
		packet.writeD(characters.length);
		packet.writeD(config.max_characters_number);
		packet.writeC(characters.length == config.max_characters_number ? 0x01 : 0x00); // if 1 can't create new char
		packet.writeC(0x01); // 0=can't play, 1=can play free until level 85, 2=100% free play
		packet.writeD(0x02); // if 1, Korean client
		packet.writeC(0x00); // Balthus Knights, if 1 suggests premium accouny

		let lastAccess = 0;
		if (this.activeId == -1)
		{
			for (let i = 0; i < characters.length; i++)
			{
				if (lastAccess < characters[i].last) {
					lastAccess = characters[i].last;
					this.activeId = i;
				}
			}
		}

		for (let i = 0; i < characters.length; i++)
		{
			let character = characters[i];
			packet.writeS(character.name); // Character name
			packet.writeD(character.id); // Character ID
			packet.writeS(this.loginName); // Account name
			packet.writeD(this.sessionId); // Account ID
			packet.writeD(0x00); // Pledge ID
			packet.writeD(0x00); // Builder level

			packet.writeD(character.sex); // Sex
			packet.writeD(character.race); // Race
			packet.writeD((character.classid == character.classbase) ? character.classid : character.classbase);

			packet.writeD(0x01); // GameServerName

			packet.writeD(character.x);
			packet.writeD(character.y);
			packet.writeD(character.z);
			packet.writeF(character.hp);
			packet.writeF(character.mp);
			packet.writeQ(character.sp);
			packet.writeQ(character.exp);
			packet.writeF((character.exp - TableExperience.getExp(character.level)) / (TableExperience.getExp(character.level + 1) - TableExperience.getExp(character.level)));

			packet.writeD(character.level);

			packet.writeD(character.karma);
			packet.writeD(character.pk);
			packet.writeD(character.pvp);

			packet.writeD(0x00);
			packet.writeD(0x00);
			packet.writeD(0x00);
			packet.writeD(0x00);
			packet.writeD(0x00);
			packet.writeD(0x00);
			packet.writeD(0x00);

			packet.writeD(0x00); // Ertheia
			packet.writeD(0x00); // Ertheia

			packet.writeD(this.getPaperdoll(character.inventory, "underwear"));
			packet.writeD(this.getPaperdoll(character.inventory, "rear;lear"));
			packet.writeD(this.getPaperdoll(character.inventory, "rear;lear"));
			packet.writeD(this.getPaperdoll(character.inventory, "neck"));
			packet.writeD(this.getPaperdoll(character.inventory, "rfinger;lfinger"));
			packet.writeD(this.getPaperdoll(character.inventory, "rfinger;lfinger"));
			packet.writeD(this.getPaperdoll(character.inventory, "head"));
			packet.writeD(this.getPaperdoll(character.inventory, "rhand"));
			packet.writeD(this.getPaperdoll(character.inventory, "lrhand"));
			packet.writeD(this.getPaperdoll(character.inventory, "gloves"));
			packet.writeD(this.getPaperdoll(character.inventory, "chest"));
			packet.writeD(this.getPaperdoll(character.inventory, "legs"));
			packet.writeD(this.getPaperdoll(character.inventory, "feet"));
			packet.writeD(this.getPaperdoll(character.inventory, "cloak"));
			packet.writeD(this.getPaperdoll(character.inventory, "rhand"));

			for (let i = 0; i < 42-15; ++i)
			{
				let id = 0x00;
				packet.writeD(id);
			}

			packet.writeH(0x00); // Upper Body enchant level
			packet.writeH(0x00); // Lower Body enchant level
			packet.writeH(0x00); // Headgear enchant level
			packet.writeH(0x00); // Gloves enchant level
			packet.writeH(0x00); // Boots enchant level

			packet.writeD(character.hair_style);
			packet.writeD(character.hair_color);
			packet.writeD(character.face);

			packet.writeF(character.HP); // Maximum HP
			packet.writeF(character.MP); // Maximum MP

			packet.writeD(character.deletetime > 0 ? ((character.deletetime - (Date.now() - config.character_delete_time * 60000)) / 1000) : 0);
			packet.writeD(character.classid);
			packet.writeD(i == this.activeId ? 1 : 0);

			packet.writeC(127);
			packet.writeD(0);
			packet.writeD(0);

			packet.writeD(0x00); // Currently on retail when you are on character select you don't see your transformation.

			packet.writeD(0x00); // Pet NpcId
			packet.writeD(0x00); // Pet level
			packet.writeD(0x00); // Pet Food
			packet.writeD(0x00); // Pet Food Level
			packet.writeF(0x00); // Current pet HP
			packet.writeF(0x00); // Current pet MP

			packet.writeD(character.vp); // Vitality
			packet.writeD(config.rate_vitality_exp_multiplier * 100); // Vitality Percent
			packet.writeD(0); // Remaining vitality item uses
			packet.writeD(character.access == -100 ? 0x00 : 0x01);
			packet.writeC(character.nobless);
			packet.writeC(0); // Hero glow
			packet.writeC(0); // Show hair accessory if enabled

			//packet.writeC(0); // Show hair accessory if enabled
			//for (let i = 0; i < 1; i++)
			//packet.writeC(0x00); // Show hair accessory if enabled
		}
	}

	getPaperdoll(inventory, bodypart) {
		for (let col of inventory) {
			if (col.equipped == true) {
				let item = TableItems.getItemById(col.id);
				if (item.bodypart == bodypart) {
					return col.id;
				}
			}
		}
		return 0x00;
	}
}
module.exports = CharSelectionInfo;