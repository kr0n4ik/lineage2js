const fs = require("fs");
const ExIncomingPackets = require('../ExIncomingPackets');
const LOGGER = (new (require("../../logger/Logger"))("ExPacket"));

class ExPacket 
{
	run(client, packet) 
	{
		let opcode = packet.readH();
		if (!fs.existsSync("gameserver/network/clientpackets/" + ExIncomingPackets[opcode] + ".js")) 
		{
			LOGGER.error("Not found expacket 0x" + ("0" + opcode.toString(16)).substr(-2) + " " + ExIncomingPackets[opcode].green);
			return;
		}
		//try {
			(new (require("./" + ExIncomingPackets[opcode]))()).run(client, packet);
	//	} catch(err) {
		//	console.log(err);
		//}
	}
}
module.exports = ExPacket;