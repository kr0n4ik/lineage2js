const config = require("../../config");
const KeyPacket = require("../serverpackets/KeyPacket");
const LOGGER = (new (require("../../logger/Logger"))("ProtocolVersion"));

class SendProtocolVersion 
{
	run(client, packet) 
	{
		let version = packet.readD();
		if (version == -2) 
		{
			client.close();
		}
		else if (config.protocol_list.indexOf(version) == -1)
		{
			LOGGER.warning("Wrong protocol version " + version);
			client.setProtocolOk(false);
			client.close(new KeyPacket(client.enableCrypt(), 0));
		}
		else
		{
			client.setProtocolOk(true);
			client.write(new KeyPacket(client.enableCrypt(), 1));
		}
	}
}
module.exports = SendProtocolVersion;