class CharCreateOk
{
	static STATIC_PACKET = new CharCreateOk();

	constructor()
	{
		
	}

	write(packet) 
	{
		packet.writeC(0x0F);
		packet.writeD(1);
	}

}
module.exports = CharCreateOk;