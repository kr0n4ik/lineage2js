const config = require("../../config");
class KeyPacket 
{
	constructor(key, result = 1) 
	{
		this.key = key;
		this.result = result;
	}

	write(packet)
	{
		packet.writeC(0x2e);
		packet.writeC(this.result); // 0 - wrong protocol, 1 - protocol ok
		for (let i = 0; i < 8; ++i) 
		{
			packet.writeC(this.key[i]); // key
		}
		packet.writeD(0x01);
		packet.writeD(config.server_id); // server id
		packet.writeC(0x01);
		packet.writeD(0x00); // obfuscation key
		packet.writeC(((config.server_list_type & 0x400) == 0x400 ) ? 0x01 : 0x00); 
	}
}
module.exports = KeyPacket;