class MoveToLocation 
{
	constructor(cha, x, y, z) {
		this.cha = cha;
		this.x = x;
		this.y = y;
		this.z = z;
	}
	write(packet)
	{
		packet.writeC(0x2F);
		packet.writeD(this.cha.getCharId());
		
		packet.writeD(this.x);
		packet.writeD(this.y);
		packet.writeD(this.z);
		
		packet.writeD(this.cha.getX());
		packet.writeD(this.cha.getY());
		packet.writeD(this.cha.getZ());
	}
}
module.exports = MoveToLocation;