class ExIsCharNameCreatable
{
	constructor(allowed) 
	{
		this.allowed = allowed;
	}

	write(packet) 
	{
		console.log(this.allowed)
		packet.writeC(0xFE);
		packet.writeH(0x10B);
		packet.writeD(this.allowed);
	}
}
module.exports = ExIsCharNameCreatable;