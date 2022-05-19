class CharacterSelected
{
	constructor(cha, session) 
	{
		this.cha = cha;
		this.session = session;
	}
	write(packet)
	{
		packet.writeC(0x0B);
		packet.writeS(this.cha.getName());
		packet.writeD(this.cha.getCharId());
		packet.writeS(this.cha.getTitle());
		packet.writeD(this.session);
		packet.writeD(this.cha.getClanId());
		packet.writeD(0x00); // ??
		packet.writeD(this.cha.getSex());
		packet.writeD(this.cha.getRace());
		packet.writeD(this.cha.getClassId());
		packet.writeD(0x01); // active ??
		packet.writeD(this.cha.getX());
		packet.writeD(this.cha.getY());
		packet.writeD(this.cha.getZ());
		packet.writeF(this.cha.getHp());
		packet.writeF(this.cha.getMp());
		packet.writeQ(this.cha.getSp());
		packet.writeQ(this.cha.getExp());
		packet.writeD(this.cha.getLevel());
		packet.writeD(this.cha.getReputation());
		packet.writeD(this.cha.getPkKills());
		packet.writeD((Date.now()/1000) % (24 * 60)); // "reset" on 24th hour
		packet.writeD(0x00);
	
		packet.writeD(this.cha.getClassId());
		
		packet.writeB(new Buffer.alloc(16));
		
		packet.writeD(0x00);
		packet.writeD(0x00);
		packet.writeD(0x00);
		packet.writeD(0x00);
		
		packet.writeD(0x00);
		
		packet.writeD(0x00);
		packet.writeD(0x00);
		packet.writeD(0x00);
		packet.writeD(0x00);
		
		packet.writeB(new Buffer.alloc(28));
		packet.writeD(0x00);
	}
}
module.exports = CharacterSelected;