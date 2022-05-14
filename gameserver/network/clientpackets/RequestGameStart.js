const ConnectionState = require("../../enums/ConnectionState");
const CharacterSelected = require("../serverpackets/CharacterSelected");
const LOGGER = (new (require("../../logger/Logger"))("RequestGameStart"));

class RequestGameStart
{
	run(client, packet) 
	{
		let charSlot = packet.readD();
		let unk1 = packet.readH();
		let unk2 = packet.readD();
		let unk3 = packet.readD();
		let unk4 = packet.readD();
		
		if (client.getActiveChar() == null)
		{
			let cha = client.loadChar(charSlot);
			if (cha == null)
			{
				LOGGER.warning("Character could not be loaded (slot:" + charSlot + ")");
				return;
			}
			cha.setOnlineStatus(true, true);
			client.setActiveChar(cha);
			client.setState(ConnectionState.IN_GAME);
			client.write(new CharacterSelected(cha, client.getSession()));
		}
	}
}
module.exports = RequestGameStart;