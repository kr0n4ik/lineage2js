const config = require("../../config");
const TableClassId = require("../../data/TableClassId");
//const TableExperience = require("../../data/TableExperience");
const UserInfoType = require("../../enums/UserInfoType");
const AbstractMaskPacket = require("./AbstractMaskPacket");
const LOGGER = (new (require("../../logger/Logger"))("UserInfo"));

class UserInfo
{
	constructor(cha, all) 
	{
		this.code = [0x80,0x40,0x20,0x10,0x08,0x04,0x02,0x01];
		this.masks = [0x00, 0x00, 0x00];
		this.cha = cha;
		this.size = 5;

		this.moveMultiplier = this.cha.getMovementSpeedMultiplier();
		this.runSpd = Math.round(this.cha.getRunSpeed() / this.moveMultiplier);
		this.walkSpd = Math.round(this.cha.getWalkSpeed() / this.moveMultiplier);
		this.swimRunSpd = Math.round(this.cha.getSwimRunSpeed() / this.moveMultiplier);
		this.swimWalkSpd = Math.round(this.cha.getSwimWalkSpeed() / this.moveMultiplier);
		this.flyRunSpd = this.cha.isFlying() ? this.runSpd : 0;
		this.flyWalkSpd = this.cha.isFlying() ? this.walkSpd : 0;
		this.enchantLevel = 0x00;//this.cha.getInventory().getWeaponEnchant();
		this.armorEnchant = 0x00;//this.cha.getInventory().getArmorMinEnchant();

		this.title = cha.getTitle();

		if (cha.isGM() && cha.isInvisible()) {
			this.title = "[Invisible]";
		}

		if (all == true) {
			for (let mask in UserInfoType) {
				this.add(UserInfoType[mask]);
			}
		}
	}

	add(data) {
		switch (data.id) {
			case UserInfoType.BASIC_INFO.id:
				{
					this.size += (this.cha.getVisibleName().length * 2);
					break;
				}
			case UserInfoType.CLAN.id:
				{
					this.sise += (this.title.length * 2);
					break;
				}
		}
		this.size += data.size;
		this.masks[data.mask >> 3] |= this.code[data.mask & 7];
	}

	write(packet) {
		packet.writeC(0x32);
		packet.writeD(this.cha.getCharId());
		packet.writeD(this.size);
		packet.writeH(23);
		packet.writeB(this.masks);

		

		if (this.contains(UserInfoType.RELATION))
		{
			packet.writeD(0x00);
		}

		if (this.contains(UserInfoType.BASIC_INFO))
		{
			packet.writeH(16 + (this.cha.getVisibleName().length * 2));
			packet.writeT(this.cha.getVisibleName());
			packet.writeC(this.cha.isGM() ? 0x01 : 0x00);
			packet.writeC(this.cha.getRace());
			packet.writeC(this.cha.getSex());
			packet.writeD(TableClassId.getRootClassId(this.cha.getClassId()));
			packet.writeD(this.cha.getClassId());
			packet.writeC(this.cha.getLevel());
		}

		if (this.contains(UserInfoType.BASE_STATS))
		{
			packet.writeH(18);
			packet.writeH(this.cha.getSTR());
			packet.writeH(this.cha.getDEX());
			packet.writeH(this.cha.getCON());
			packet.writeH(this.cha.getINT());
			packet.writeH(this.cha.getWIT());
			packet.writeH(this.cha.getMEN());
			packet.writeH(this.cha.getLUC());
			packet.writeH(this.cha.getCHA());
		}

		if (this.contains(UserInfoType.MAX_HPCPMP)) //MAX_HPCPMP
		{
			packet.writeH(14);
			packet.writeD(this.cha.getHP());
			packet.writeD(this.cha.getMp());
			packet.writeD(this.cha.getCP());
		}

		if (this.contains(UserInfoType.CURRENT_HPMPCP_EXP_SP))
		{
			packet.writeH(38);
			packet.writeD(Math.round(this.cha.getHp()));
			packet.writeD(Math.round(this.cha.getMp()));
			packet.writeD(Math.round(this.cha.getCp()));
			packet.writeQ(this.cha.getSp());
			packet.writeQ(this.cha.getExp());
			packet.writeF(0.5);//(this.cha.getExp() - TableExperience.getExp(this.cha.getLevel())) / (TableExperience.getExp(this.cha.getLevel() + 1) - TableExperience.getExp(this.cha.getLevel())));
		}

		if (this.contains(UserInfoType.ENCHANTLEVEL)) //ENCHANTLEVEL
		{
			packet.writeH(4);
			packet.writeC(this.enchantLevel);
			packet.writeC(this.armorEnchant);
		}

		if (this.contains(UserInfoType.APPAREANCE))
		{
			packet.writeH(15);
			packet.writeD(this.cha.getVisualHair());
			packet.writeD(this.cha.getVisualHairColor());
			packet.writeD(this.cha.getVisualFace());
			packet.writeC(this.cha.isHairAccessoryEnabled() ? 0x01 : 0x00);
		}

		if (this.contains(UserInfoType.STATUS))
		{
			packet.writeH(6);
			packet.writeC(5);
			packet.writeC(5);
			packet.writeC(1);
			packet.writeC(0x00);
		}

		if (this.contains(UserInfoType.STATS)) 
		{
			packet.writeH(56);
			packet.writeH(this.cha.getActiveWeaponItem() != null ? 40 : 20);
			packet.writeD(this.cha.getPAtk());
			packet.writeD(this.cha.getPAtkSpd());
			packet.writeD(this.cha.getPDef());
			packet.writeD(this.cha.getEvasionRate());
			packet.writeD(this.cha.getAccuracy());
			packet.writeD(this.cha.getCriticalHit());
			packet.writeD(this.cha.getMAtk());
			packet.writeD(this.cha.getMAtkSpd());
			packet.writeD(this.cha.getPAtkSpd());
			packet.writeD(this.cha.getMagicEvasionRate());
			packet.writeD(this.cha.getMDef());
			packet.writeD(this.cha.getMagicAccuracy());
			packet.writeD(this.cha.getMCriticalHit());
		}

		if (this.contains(UserInfoType.ELEMENTALS))
		{
			packet.writeH(14);
			packet.writeH(0x00);
			packet.writeH(0x00);
			packet.writeH(0x00);
			packet.writeH(0x00);
			packet.writeH(0x00);
			packet.writeH(0x00);
		}

		if (this.contains(UserInfoType.POSITION))
		{
			packet.writeH(18);
			packet.writeD(this.cha.getX());
			packet.writeD(this.cha.getY());
			packet.writeD(this.cha.getZ());
			packet.writeD(0);
		}

		if (this.contains(UserInfoType.SPEED))
		{
			packet.writeH(18);
			packet.writeH(this.runSpd);
			packet.writeH(this.walkSpd);
			packet.writeH(this.swimRunSpd);
			packet.writeH(this.swimWalkSpd);
			packet.writeH(this.flRunSpd);
			packet.writeH(this.flWalkSpd);
			packet.writeH(this.flyRunSpd);
			packet.writeH(this.flyWalkSpd);
		}

		if (this.contains(UserInfoType.MULTIPLIER))
		{
			packet.writeH(18);
			packet.writeF(1.0);
			packet.writeF(1.0);
		}

		if (this.contains(UserInfoType.COL_RADIUS_HEIGHT))
		{
			packet.writeH(18);
			packet.writeF(this.cha.getCollisionRadius());
			packet.writeF(this.cha.getCollisionHeight());
		}

		if (this.contains(UserInfoType.ATK_ELEMENTAL))
		{
			packet.writeH(10);
			packet.writeD(this.moveMultiplier);
			packet.writeD(this.cha.getAttackSpeedMultiplier());
		}

		if (this.contains(UserInfoType.CLAN))
		{
			packet.writeH(32 + (this.title.length * 2));
			packet.writeT(this.title);
			packet.writeH(this.cha.getPledgeType());
			packet.writeD(this.cha.getClanId());
			packet.writeD(this.cha.getClanCrestLargeId());
			packet.writeD(this.cha.getClanCrestId());
			packet.writeD(0x00);
			packet.writeC(this.cha.isClanLeader() ? 0x01 : 0x00);
			packet.writeD(this.cha.getAllyId());
			packet.writeD(this.cha.getAllyCrestId());
			packet.writeC(this.cha.isInMatchingRoom() ? 0x01 : 0x00);
		}

		if (this.contains(UserInfoType.SOCIAL))
		{
			packet.writeH(22);
			packet.writeC(this.cha.getPvpFlag());
			packet.writeD(this.cha.getReputation()); // Reputation
			packet.writeC(0x00);
			packet.writeC(this.cha.isHero() || (this.cha.isGM() && config.gm_hero_aura) ? 1 : 0);
			packet.writeC(this.cha.getPledgeClass());
			packet.writeD(this.cha.getPkKills());
			packet.writeD(this.cha.getPvpKills());
			packet.writeH(this.cha.getRecomLeft());
			packet.writeH(this.cha.getRecomHave());
		}

		if (this.contains(UserInfoType.VITA_FAME))
		{
			packet.writeH(15);
			packet.writeD(0x00);
			packet.writeC(0x00); // Vita Bonus
			packet.writeD(0x00);
			packet.writeD(0x00);
		}

		if (this.contains(UserInfoType.SLOTS))
		{
			packet.writeH(9);
			packet.writeC(0x00); // Confirmed
			packet.writeC(0x00); // Confirmed
			packet.writeC(0x00); // Confirmed
			packet.writeC(0x03); // (1 = Red, 2 = White, 3 = White Pink) dotted ring on the floor
			packet.writeC(0x00);
			packet.writeC(0x00);
			packet.writeC(0x00);
		}

		if (this.contains(UserInfoType.MOVEMENTS))
		{
			packet.writeH(4);
			packet.writeC(2);
			packet.writeC(this.cha.isRunning() ? 0x01 : 0x00);
		}

		if (this.contains(UserInfoType.COLOR))
		{
			packet.writeH(10);
			packet.writeD(this.cha.getNameColor());
			packet.writeD(this.cha.getTitleColor());
		}

		if (this.contains(UserInfoType.INVENTORY_LIMIT))
		{
			packet.writeH(9);
			packet.writeH(0x00);
			packet.writeH(0x00);
			packet.writeH(this.cha.getInventoryLimit());
			packet.writeC(0);
		}

		if (this.contains(UserInfoType.TRUE_HERO))
		{
			packet.writeH(9);
			packet.writeD(0x00);
			packet.writeH(0x00);
			packet.writeC(this.cha.isTrueHero() ? 100 : 0x00);
		}
	}

	contains(data) {
		return (this.masks[data.mask >> 3] & this.code[data.mask & 7]) != 0;
	}

}
module.exports = UserInfo;